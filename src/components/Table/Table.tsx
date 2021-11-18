interface Column {
  title: string;
  field: string;
}

interface Props {
  title: string;
  columns: Column[];
  data?: any[];
}

const Table = ({ title, columns, data }: Props) => {
  return (
    <>
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>
            {columns.map(({ title }) => (
              <th>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((el) => (
            <tr>
              {columns.map(({ field }) => (
                <td>{el[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
