import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import db from '../config'
import { TextInput } from 'react-native-paper';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

export default class SearchTransitionScreen extends React.Component{
  constructor(){
    super();
    this.state={allTransaction:[], lastVisibleTransaction:null}
  }
  componentDidMount = async()=>{
    const query = await db.collection("transactions").limit(10).get()
    query.docs.map((doc)=>{
      this.setState({allTransaction:[], lastVisibleTransaction:doc})
    })
  }

fetchMoreTransaction = async()=>{
  var text = this.state.search.toUpperCase()
  var enterText = text.split("")
  if(enterText[0].toUpperCase()==='B'){
    const query = await db.collection("transactions").where("bookId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({allTransaction:[...this.state.allTransaction, doc.data()], lastVisibleTransaction:doc})
    })
  }
 else{
 if(enterText[0].toUpperCase()==='S'){
    const query = await db.collection("transactions").where("studentId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({allTransaction:[...this.state.allTransaction, doc.data()], lastVisibleTransaction:doc})
    })
  }
}
}
  
searchTransaction = async(text)=>{
  var enterText = text.split("")
  if(enterText[0].toUpperCase()==='B'){
    const query = await db.collection("transactions").where("bookId","==",text).get()
    query.docs.map((doc)=>{
      this.setState({allTransaction:[...this.state.allTransaction, doc.data()], lastVisibleTransaction:doc})
    })
  }
 else{
 if(enterText[0].toUpperCase()==='S'){
    const query = await db.collection("transactions").where("studentId","==",text).get()
    query.docs.map((doc)=>{
      this.setState({allTransaction:[...this.state.allTransaction, doc.data()], lastVisibleTransaction:doc})
    })
  }
}
}

  render(){
    return(
<View style={styles.container}>
<View style={styles.searchBar}>
<TextInput style={styles.bar} placeholder='Enter BookId or StudentId' onChangeText={(text)=>{this.setState({search:text})}}/>
<TouchableOpacity style={style.searchButton} onPress={()=>{this.searchTransaction(this.state.search)}}><Text>Search</Text></TouchableOpacity>
</View>
<FlatList data={this.state.allTransactions} renderItem={({item})=>( 
<View style={{borderBottomWidth: 2}}> 
<Text>{"Book Id: " + item.bookId}</Text> 
<Text>{"Student id: " + item.studentId}</Text>
<Text>{"Transaction Type: " + item.transactionType}</Text>
<Text>{"Date: " + item.date.toDate()}</Text> </View> )} keyExtractor= {(item, index)=> index.toString()} 
onEndReached ={this.fetchMoreTransactions} onEndReachedThreshold={0.7} />
</View>
    );
  }
}

const styles=StyleSheet.create({
  container:{flex:1, margin:20},
  searchBar:{flexDirection:'row', heigth:40, width:'auto', borderWidth:0.5, alignItems:'center', backgroundColor:'grey'},
  bar:{borderWidth:2, height:30, width:300, paddingLeft:10},
  searchButton:{bordrWidth:1, height:30, width:50, alignItems:'center', justifyContent:'center', backgroundColor:'green'}
})