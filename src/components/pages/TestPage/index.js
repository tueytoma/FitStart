import React from 'react'
import Request from 'superagent'

export default class TestPage extends React.Component{

  constructor(props){
    super(props)
    this.state = {users : []}
  }

  componentDidMount(){
    Request.get('http://localhost:4000/users')
      .end((err,res)=>{
        if(err) console.log(err)
        else this.setState({users : res.body.users})
      })
  }

  getUserLists(){
    var print = []
    for(var x of this.state.users){
      print.push(<div>{x.email}</div>)
    }
    return print
  }

  render(){
    return (
      <div>
        <h1>Hello World</h1>
        <h3>Users List :</h3>
        {this.state.users.length > 0 ? this.getUserLists() : ''}
      </div>
    )
  }
}

// const HomePage = () => {
//   return (
//     <div>
//       <div>Hello World</div>
//     </div>
//   )
// }

// export default HomePage
