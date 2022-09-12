const TableRow = (props) => {
    return ( 
        props.rowsData.map((data) => {
            const {_id, author, description, status, reviewer, comments,color} = data;

            const handleSubmit = (e)=>{
                props.setIssueDesc('HELLO' + _id)
            }

            return(
                <tr key={_id} className="issue-row" onClick={handleSubmit}>
                    <td>
                        {color}
                    </td>
                    <td>
                        {author}
                    </td>
                    <td>
                        {description}
                    </td>
                    <td>
                        {status}
                    </td>
                    <td>
                        {reviewer}
                    </td>
                    <td>
                        {comments}
                    </td>
                </tr>
            )
        })
    );
}
 
export default TableRow;