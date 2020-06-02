import React from 'react';

const TableHeader = (props) => {
    const { headers } = props;
    return (
        <thead className="thead-dark">
            <tr>
                {headers && headers.map((value, index, i) => {
                    return <th key={index}>
                        {value}
                    </th>
                }
                )}
                <th>
                    Edit
                </th>
                <th>
                    Delete
                </th>
            </tr>
        </thead>
    );
}

export default TableHeader;