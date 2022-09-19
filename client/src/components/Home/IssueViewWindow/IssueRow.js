const TableRow = (props) => {

    if (props == null){
        return
    }

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
                window.location.reload(false);
            }


            return(        
            <div>
                <table>
                    <tbody>
                        <tr id="header-row">
                            <td>
                            </td>
                            <td>
                                Issue Name
                            </td>
                            <td>
                                Description
                            </td>
                            <td>
                                Status
                            </td>
                            <td>
                                Reviewer
                            </td>
                            <td>
                                Comments
                            </td>
                        </tr><tr key={_id} className="issue-row" onClick={()=>{window.location.href = `/view/${_id}`}}>
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
                    </tbody>
                </table>
            </div>
            )
        })
    );
}
 
export default TableRow;