const TableRow = (props) => {
    return ( 
        props.rowsData.map((data) => {
            const {_id, author, description, status, reviewer, comments,color, projectName} = data;

            const deleteIssue = async  (id)=>{
                const options = {
                    method : 'DELETE',
                    body: JSON.stringify({_id : id}),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }

                const res = await fetch('/issues/deleteIssue', options)
                const data = await res.json();
                console.log(data)
                window.location.reload(false);
            }


            return(
                <tr key={_id} className="issue-row" onClick={()=>{window.location.href = `/view/${_id}`}}>
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
                    <td><button onClick={(e)=>{(deleteIssue(_id))}}>X</button></td>
                </tr>
            )
        })
    );
}
 
export default TableRow;