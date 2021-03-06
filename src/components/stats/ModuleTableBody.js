/*
 * @flow
 */

import type {
  ModuleID,
  ExtendedModule,
  RowRepresentation,
} from '../../types/Stats';

import Button from '../Bootstrap/Button';
import ExternalModuleLink from './ExternalModuleLink';
import formatModuleName from './formatModuleName';
import flatten from '../../utils/flatten';
import OffsetPageAnchor from '../OffsetPageAnchor';
import React from 'react';
import Unit from '../Unit';
import {getClassName} from '../Bootstrap/GlyphiconNames';
import {
  RequiredByPanelContainer,
  RequirementsPanelContainer,
} from './ModulePanelContainers';

import './ModuleTableBody.css';

type TBodyProps = {
  rows: Array<RowRepresentation>,
  expandMode: 'manual' | 'collapse-all' | 'expand-all',
  expandedRecords: Set<ModuleID>,
  onRemoveModule: (moduleID: ModuleID) => void,
  onExpandRecords: (moduleID: ModuleID) => void,
  onCollapseRecords: (moduleID: ModuleID) => void,
};

type GroupedTRProps = {
  row: RowRepresentation,
  expanded: boolean,
  onRemoveModule: (moduleID: ModuleID) => void,
  onExpandRecords: (moduleID: ModuleID) => void,
  onCollapseRecords: (moduleID: ModuleID) => void,
};

type TRProps = {
  eModule: ExtendedModule,
  records: Array<ExtendedModule>,
  expanded: boolean,
  onRemoveModule: (moduleID: ModuleID) => void,
  onExpandRecords: (moduleID: ModuleID) => void,
  onCollapseRecords: (moduleID: ModuleID) => void,
};

function getExpandButton(
  expanded: boolean,
  recordCount: number,
  callback: Function,
) {
  return (
    <span className="pull-right">
      <Button
        color="link"
        size="xs"
        onClick={callback}>
        <span
          className={expanded
            ? getClassName('triangle-bottom')
            : getClassName('triangle-right')}
          aria-hidden="true"></span>
        {`${recordCount} unique imports`}
      </Button>
    </span>
  );
}

function ModuleTableGroupedRows(props: GroupedTRProps): Array<*> {
  return props.expanded
    ? props.row.records.map((record) => (
      <ModuleTableRow
        key={record.id}
        size="sm"
        eModule={record}
        records={props.row.records}
        expanded={props.expanded}
        onRemoveModule={props.onRemoveModule}
        onExpandRecords={props.onExpandRecords}
        onCollapseRecords={props.onCollapseRecords}
      />
    ))
    : [
      <ModuleTableRow
        key={props.row.displayModule.id}
        size={null}
        eModule={props.row.displayModule}
        records={props.row.records}
        expanded={props.expanded}
        onRemoveModule={props.onRemoveModule}
        onExpandRecords={props.onExpandRecords}
        onCollapseRecords={props.onCollapseRecords}
      />
    ];
}

function ModuleTableRow(props: TRProps) {
  const eModule = props.eModule;
  const records = props.records;

  const moduleSize = props.expanded
    ? <Unit bytes={eModule.size} />
    : <Unit
      bytes={records.reduce((sum, eModule) => sum + eModule.size, 0)}
    />;

  const hasCollapsedChildren = records.length > 1;
  const isFirstRecord = eModule.id === records[0].id;
  const uniqueImports = (hasCollapsedChildren && isFirstRecord)
    ? getExpandButton(
      props.expanded,
      records.length - 1,
      props.expanded
        ? () => props.onCollapseRecords(eModule.id)
        : () => props.onExpandRecords(eModule.id)
    )
    : null;

  return (
    <tr
      key={eModule.id}
      {...OffsetPageAnchor(String(eModule.id), {
        className: [
          'ModuleTableBody-row',
          props.expanded && props.records.length > 1
            ? 'ModuleTableBody-expanded-border'
            : null,
        ].filter(_ => _).join(' ')
      })}
    >
      <td className="vert-align">
        <ExternalModuleLink
          prefix={process.env.REACT_APP_EXTERNAL_URL_PREFIX}
          module={eModule}
        />
      </td>
      <td className="vert-align">
        {uniqueImports}
        {formatModuleName(eModule.name)}
      </td>
      <td className="vert-align numeric">
        <Unit bytes={eModule.cumulativeSize} />
      </td>
      <td className="vert-align numeric">
        {moduleSize}
      </td>
      <td className="vert-align numeric">
        <RequiredByPanelContainer eModule={eModule} />
      </td>
      <td className="vert-align numeric">
        <RequirementsPanelContainer eModule={eModule} />
      </td>
      <td className="vert-align">
        <Button onClick={() => props.onRemoveModule(eModule.id)}>
          Ignore
        </Button>
      </td>
    </tr>
  );
}

export default function ModuleTableBody(props: TBodyProps) {
  return (
    <tbody>
      {flatten(
        props.rows.map((row: RowRepresentation) => ModuleTableGroupedRows({
          row: row,
          expanded: props.expandMode === 'expand-all' ||
            (props.expandMode === 'manual' && props.expandedRecords.has(row.displayModule.id)),
          onRemoveModule: props.onRemoveModule,
          onExpandRecords: props.onExpandRecords,
          onCollapseRecords: props.onCollapseRecords,
        }))
      )}
    </tbody>
  );
}
