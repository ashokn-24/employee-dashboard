import { useEffect, useState, useCallback } from "react";
import { useEmployee } from "../context/EmployeeContext";
import Spinner from "./Spinner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
const DataGrid = () => {
  const { getAllEmployees, loading, employees, deleteEmployee } = useEmployee();
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const debouncedFetchEmployees = useCallback(
    debounce(() => {
      fetchEmployees();
    }, 500),
    [searchParams]
  );
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    const sortParam = searchParams.get("sortBy") || "";
    setSearch(searchParam);
    setSortBy(sortParam);
    debouncedFetchEmployees();
  }, [searchParams, debouncedFetchEmployees]);
  useEffect(() => {
    applyFiltersAndSort();
  }, [search, sortBy, employees, page, rowsPerPage]);
  const fetchEmployees = async () => {
    const queryParams = `?${searchParams.toString()}`;
    await getAllEmployees(queryParams);
  };
  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }
    setSearchParams(updatedParams);
    navigate(`?${updatedParams.toString()}`);
  };

  const applyFiltersAndSort = () => {
    let filtered = [...employees];

    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      filtered = filtered.filter((employee) =>
        employee.f_name?.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "name") {
          return a.f_name.localeCompare(b.f_name);
        } else if (sortBy === "email") {
          return a.f_email.localeCompare(b.f_email);
        } else if (sortBy === "id") {
          return a.f_id - b.f_id;
        } else if (sortBy === "date") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
    }

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    setFilteredEmployees(filtered.slice(start, end));
  };

  const handleDelete = (id) => {
    deleteEmployee(id);
  };
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="flex gap-3">
          <div className="flex items-center">
            <label htmlFor="search" className="mr-2">
              Search:
            </label>
            <input
              id="search"
              type="text"
              className="border px-4 py-2 rounded-md"
              placeholder="Enter Keyword"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                updateSearchParams("search", e.target.value);
              }}
            />
          </div>
          <div className="flex items-center">
            <span>
              Total Count :{" "}
              {search ? filteredEmployees.length : employees.length}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2">
              Sort By:
            </label>
            <select
              id="sort"
              className="border px-4 py-2 rounded-md"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                updateSearchParams("sortBy", e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="id">ID</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="rows" className="mr-2">
              Rows per page:
            </label>
            <select
              id="rows"
              className="border px-4 py-2 rounded-md"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-11 bg-gray-100 font-bold p-2">
          <div>ID</div>
          <div>Image</div>
          <div>Name</div>
          <div className="col-span-2">Email</div>
          <div>Mobile</div>
          <div>Designation</div>
          <div>Gender</div>
          <div>Course</div>
          <div>Date</div>
          <div>Action</div>
        </div>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((item) => (
            <div
              key={item?._id}
              className="grid grid-cols-11 items-center p-2 border-t"
            >
              <div>{item?.f_id}</div>
              <div>
                <img
                  src={item?.f_image}
                  alt={`Image ${item?._id}`}
                  className="w-10 h-10 object-cover rounded-md"
                />
              </div>
              <div>{item?.f_name}</div>
              <div className="col-span-2">
                <a
                  href={`mailto:${item?.f_email}`}
                  className="text-blue-500 text-xs"
                >
                  {item?.f_email}
                </a>
              </div>
              <div>{item?.f_mobile}</div>
              <div>{item?.f_designation}</div>
              <div>{item?.f_gender}</div>
              <div>{item?.f_course}</div>
              <div>{new Date(item?.createdAt).toLocaleDateString()}</div>
              <div className="flex space-x-2">
                <Link
                  to={`/emp/update/${item?._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center p-10 m-10">
            <span>No data found</span>
          </div>
        )}
      </div>

      {filteredEmployees.length > 0
        ? totalPages > 1 && (
            <div className="flex gap-3 justify-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 cursor-pointer rounded-full ${
                    page === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  } hover:scale-110 transition-all duration-300`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          )
        : null}
    </div>
  );
};

export default DataGrid;
