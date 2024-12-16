import React from "react";
import DataTable from "react-data-table-component";
import { ContainerTable, LoaderWrapper, TableWrapper } from "./styles";

const Table = ({
  columns,
  data,
  progressPending,
  paginationTotalRows,
  onRowClicked,
  sx,
  onPaginationClicked,
  currentPage,
  ...rest
}) => {
  return (
    <ContainerTable sx={sx}>
      <TableWrapper>
        {progressPending ? (
          <LoaderWrapper>{/* <CustomLoader /> */}</LoaderWrapper>
        ) : !data.length ? (
          <LoaderWrapper>
            <img
              src="https://assets-v2.lottiefiles.com/a/0e30b444-117c-11ee-9b0d-0fd3804d46cd/BkQxD7wtnZ.gif"
              width={200}
              height={200}
            />
          </LoaderWrapper>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            progressPending={progressPending}
            progressComponent={
              <LoaderWrapper>{/* <CustomLoader /> */}</LoaderWrapper>
            }
            noDataComponent={
              <img
                src="https://assets-v2.lottiefiles.com/a/0e30b444-117c-11ee-9b0d-0fd3804d46cd/BkQxD7wtnZ.gif"
                width={"25%"}
                height={"25%"}
              />
            }
            // pagination
            // paginationServer
            // paginationTotalRows={paginationTotalRows}
            // onChangePage={handlePageChange}
            // onChangeRowsPerPage={handlePerRowsChange}
            // paginationComponentOptions={{
            //   rowsPerPageText: "Rows per page:",
            //   rangeSeparatorText: "of",
            //   noRowsPerPage: true,
            // }}
            pointerOnHover={onRowClicked ? true : false}
            onRowClicked={onRowClicked}
            fixedHeader
            persistTableHead
            {...rest}
          />
        )}
      </TableWrapper>
      {/* {paginationTotalRows > 0 && (
        <CustomPagination
          currentPage={currentPage}
          onPaginationClicked={onPaginationClicked}
          totalRecords={paginationTotalRows}
        />
      )} */}
    </ContainerTable>
  );
};

export default Table;
