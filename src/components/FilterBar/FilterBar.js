import React, { Component } from "react";

class FilterBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">
                Previous
              </a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="?sprint=1">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="?sprint=2">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="?sprint=3">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default FilterBar;
