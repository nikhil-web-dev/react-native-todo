import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  CheckBox,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      test : 'Hello world',
      value:"Hello world",
      itemText:"",
      items:[],
      completedItems:[],
      itemId: 0,
      checkStatus: !true,
    }
  }


  //add items in array
   addItem = () => {

    const additems = {
    id: this.state.itemId,
    name: this.state.itemText
   }
   
   this.state.items.push(additems)

   this.setState({
    itemId: ++this.state.itemId,
    itemText: null
   })
   
  }

  //if task is completed, add in completedItems and remove from items
  checkItem = (id) =>{
    this.setState({
      checkStatus: true,
      selcetedId: id
    })

    const index = this.state.items.find(item => item.id === id);

    const addCompletedItems = {
      id: index.id,
      name: index.name
    }

    this.state.completedItems.push(addCompletedItems);
    
    this.removeItem(id)
  }


  //remove item
  removeItem = (id) => {
    const index = this.state.items.findIndex(item => item.id === id);

    if (index !== -1) {
     this.state.items.splice(index, 1)[0];
     this.setState(this.state.items);
    }
  }

  //if task unchecked 
  revertItem = (id) => {
   console.log(id);
   
    const index = this.state.completedItems.find(item => item.id === id);
    const removeIndex = this.state.completedItems.findIndex(item => item.id === id);

    const revertItems = {
      id: index.id,
      name: index.name
    }

    this.state.items.push(revertItems);
    if (index !== -1) {
      this.state.completedItems.splice(removeIndex, 1)[0];
      this.setState(this.state.completedItems);
     }

    console.log(this.state.items);
    
  }

  render() {
    const {items, itemText, completedItems} = this.state;
  return (
  
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          
          <View style={styles.header}>
            <Text style={styles.headerText}>Todo App</Text>
          </View>

          <View style={styles.body}>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Add task" style={styles.item_inputField} value={itemText} onChangeText={(text)=>this.setState({itemText: text})} onSubmitEditing={this.addItem}></TextInput>
            </View>

            <View style={styles.itemListContainer}>

              {items.map((item) => {
              return (
              
                <React.Fragment key={item.id}>
                
                  <View style={styles.itemList}>
                    <View style={styles.itemCheck}>
                      <CheckBox value={false} style={styles.checkbox} onChange={()=>this.checkItem(item.id)} />
                      <Text style={styles.itemLabel}>{item.name}</Text>
                    </View>
                    <View>
                    <TouchableOpacity style={styles.removeList} onPress={()=>this.removeItem(item.id)}>
                      <Text>remove</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                  
                </React.Fragment>
                
              );
                })}

            </View>

            <View style={styles.completedContainer}>
              <Text style={styles.headText}>Checked Items</Text>

              {completedItems.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                   <View style={styles.itemList}>
                    <View style={styles.itemCheck}>
                      <CheckBox value={true} style={styles.checkbox} onChange={()=>this.revertItem(item.id)} />
                      <Text style={styles.completedItemLabel}>{item.name}</Text>
                    </View>
                    
                  </View>
                  </React.Fragment>
                )
            })}
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
   
  );
              }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  header:{
    padding: 40,
    backgroundColor: Colors.black,
  },
  headerText:{

      fontSize: 40,
      fontWeight: '600',
      textAlign: 'center',
      color: Colors.white,
  },
  
  body: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },

  completedContainer:{
    marginTop: 20
  },
  headText:{
    fontSize: 20,
    fontWeight: "bold"
  },
  item_inputField:{
    marginTop: 10,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    borderTopWidth:0,
    borderRightWidth:0,
    borderLeftWidth:0,
    borderBottomColor: "black"
  },
  itemCheck:{
    justifyContent: "space-between",
    flexDirection: "row",
  },
  itemList:{
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
  checkbox: {
    alignSelf: "flex-start",
  },
  removeList:{
  alignSelf: "flex-end"
  },
  itemLabel:{
  fontSize: 20
  },
  completedItemLabel:{
  fontSize: 20,
  textDecorationLine: 'line-through' 
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },

  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
