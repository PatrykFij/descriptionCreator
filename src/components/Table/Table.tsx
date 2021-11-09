import { useCallback, useMemo, useRef, useState } from 'react';
import { Paper, TablePagination, Tooltip } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import MaterialTable, {
  MaterialTableProps,
  MTableToolbar,
  Query,
  QueryResult,
} from 'material-table';
import theme from 'theme/theme';
import { icons } from './icons';
import * as S from './styles';

interface Props extends Omit<MaterialTableProps<any>, 'data'> {
  data?: any[] | ((query: Query<any>) => Promise<QueryResult<any>>);
  customRowStyle?: CSSProperties;
  selectedRowId?: number;
  disableDefaultSearchAndFilter?: boolean;
  disableRowClick?: boolean;
  disableHeader?: boolean;
}

const Table = (props: Props) => {
  //Can't be typed as HTMLDivElement since property 'tableContainerDiv' does not exist on type 'HTMLDivElement'
  const tableRef = useRef<any>(null);

  const [selectedRowId, setSelectedRowId] = useState(props.selectedRowId);

  const onChangePage = useCallback(
    (page: number, pageSize: number) => {
      tableRef?.current?.tableContainerDiv?.current?.scroll({
        top: 0,
      });
      if (props.onChangePage) {
        props.onChangePage(page, pageSize);
      }
    },
    [props],
  );

  const PaginationComponent = useCallback(
    (props) => <TablePagination data-testid="pagination" {...props} />,
    [],
  );

  const ToolbarComponent = useCallback(
    (props) => (
      <MTableToolbar
        classes={{ searchField: 'material-table-search-field' }}
        {...props}
      />
    ),
    [],
  );

  const ContainerComponent = useCallback(
    (props) => <Paper {...props} elevation={0} />, // disable box shadow
    [],
  );

  const columns = useMemo(
    () =>
      props.columns.map((column) => ({
        ...column,
        // to disable Material-Table default filtering (show all data from backend)
        customFilterAndSearch: props.disableDefaultSearchAndFilter
          ? () => true
          : column.customFilterAndSearch,
      })),
    [props.columns, props.disableDefaultSearchAndFilter],
  );

  return (
    <MaterialTable
      {...props}
      tableRef={tableRef}
      title={props.title || ''}
      icons={icons}
      columns={columns}
      components={{
        Pagination: PaginationComponent,
        Toolbar: ToolbarComponent,
        Container: ContainerComponent,
        Cell: (innerProps) => {
          const cellTooltip = (() => {
            // columns.type need to be "string" for showing a tooltip
            if (innerProps.columnDef.type === 'string') {
              if (innerProps.columnDef?.render) {
                // show rendered value
                return innerProps.columnDef.render(innerProps.rowData);
              }
              return innerProps.value ?? '';
            }
          })();
          return cellTooltip ? (
            <Tooltip title={cellTooltip}>
              <S.TableRow {...innerProps} />
            </Tooltip>
          ) : (
            <S.TableRow {...innerProps} />
          );
        },
        ...props.components,
      }}
      options={{
        ...props.options,
        actionsColumnIndex: -1,
        pageSizeOptions: [5, 10, 25, 50, 100],
        emptyRowsWhenPaging: false,
        headerStyle: {
          display: props.disableHeader ? 'none' : 'table-cell',
          textTransform: 'capitalize',
        },
        tableLayout: 'fixed',
        toolbar: props?.options?.toolbar || false,
        draggable: props?.options?.draggable || false,
        sorting: props?.options?.sorting || false,
        filtering: props?.options?.filtering || false,
        filterRowStyle: {
          position: 'sticky',
          background: theme.palette.background.paper,
        },
        debounceInterval: props?.options?.debounceInterval ?? 500,
        // rowStyle: (rowData) =>
        //   typeof rowData.id === 'number' && rowData.id === selectedRowId
        //     ? {
        //         ...(props.customRowStyle ?? {}),
        //         backgroundColor: '#ced7f4',
        //       }
        //     : props.customRowStyle ?? {},
        actionsCellStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: '48px',
        },
        searchFieldStyle: {
          marginLeft: '-1rem',
        },
      }}
      localization={{
        ...props.localization,
        header: {
          actions: '',
        },
        pagination: {
          firstAriaLabel: 'first-page',
          previousAriaLabel: 'previous-page',
          nextAriaLabel: 'next-page',
          lastAriaLabel: 'last-page',
          labelRowsSelect: '',
        },
      }}
      onChangePage={onChangePage}
      onRowClick={
        props.disableRowClick
          ? undefined
          : props.columns.some(({ disableClick }) => disableClick)
          ? undefined
          : (event, data) => {
              setSelectedRowId(data.id);
              if (props.onRowClick) {
                props.onRowClick(event, data);
              }
            }
      }
      data={props.data ?? []}
    />
  );
};

export default Table;
