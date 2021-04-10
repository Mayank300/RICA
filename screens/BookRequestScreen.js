import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class BookRequestScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookName: '',
      reasonToRequest: '',
      IsBookRequestActive: '',
      requestedBookName: '',
      bookStatus: '',
      requestId: '',
      userDocId: '',
      docId: '',
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = async (bookName, reasonToRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection('requested_books').add({
      user_id: userId,
      book_name: bookName,
      reason_to_request: reasonToRequest,
      request_id: randomRequestId,
      book_status: 'requested',
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    await this.getBookRequest();
    db.collection('users')
      .where('email_id', '==', userId)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            IsBookRequestActive: true,
          });
        });
      });

    this.setState({
      bookName: '',
      reasonToRequest: '',
      requestId: randomRequestId,
    });

    return Alert.alert('Item Requested Successfully');
  };

  receivedBooks = (bookName) => {
    var userId = this.state.userId;
    var requestId = this.state.requestId;
    db.collection('received_books').add({
      user_id: userId,
      book_name: bookName,
      request_id: requestId,
      bookStatus: 'received',
    });
  };

  getIsBookRequestActive() {
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            IsBookRequestActive: doc.data().IsBookRequestActive,
            userDocId: doc.id,
          });
        });
      });
  }

  getBookRequest = () => {
    // getting the requested book
    var bookRequest = db
      .collection('requested_books')
      .where('user_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().book_status !== 'received') {
            this.setState({
              requestId: doc.data().request_id,
              requestedBookName: doc.data().book_name,
              bookStatus: doc.data().book_status,
              docId: doc.id,
            });
          }
        });
      });
  };

  sendNotification = () => {
    //to get the first name and last name
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var name = doc.data().first_name;
          var lastName = doc.data().last_name;

          // to get the donor id and book nam
          db.collection('all_notifications')
            .where('request_id', '==', this.state.requestId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var donorId = doc.data().donor_id;
                var bookName = doc.data().book_name;

                //targert user id is the donor id to send notification to the user
                db.collection('all_notifications').add({
                  targeted_user_id: donorId,
                  message:
                    name + ' ' + lastName + ' received the Item ' + bookName,
                  notification_status: 'unread',
                  book_name: bookName,
                });
              });
            });
        });
      });
  };

  componentDidMount() {
    this.getBookRequest();
    this.getIsBookRequestActive();
  }

  updateBookRequestStatus = () => {
    //updating the book status after receiving the book
    db.collection('requested_books').doc(this.state.docId).update({
      book_status: 'recieved',
    });

    //getting the  doc id to update the users doc
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //updating the doc
          db.collection('users').doc(doc.id).update({
            IsBookRequestActive: false,
          });
        });
      });
  };

  render() {
    if (this.state.IsBookRequestActive === true) {
      return (
        // Status screen

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              borderColor: '#05b2f7',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Text>PRODUCT NAME</Text>
            <Text>{this.state.requestedBookName}</Text>
          </View>
          <View
            style={{
              borderColor: '#05b2f7',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 10,
            }}>
            <Text> PRODUCT STATUS </Text>

            <Text>{this.state.bookStatus}</Text>
          </View>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#05b2f7',
              backgroundColor: '#05b2f7',
              width: '55%',
              alignSelf: 'center',
              alignItems: 'center',
              height: 40,
              marginTop: 30,
              borderRadius: 20,
            }}
            onPress={() => {
              this.sendNotification();
              this.updateBookRequestStatus();
              this.receivedBooks(this.state.requestedBookName);
            }}>
            <Text style={{ marginTop: 5, color: 'white' }}>
              I recieved the Product{' '}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        // Form screen
        <View style={{ flex: 1 }}>
          <MyHeader title="BUY" navigation={this.props.navigation} />

          <ScrollView>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style={styles.formTextInput}
                placeholder={'Enter Product Name'}
                onChangeText={(text) => {
                  this.setState({
                    bookName: text,
                  });
                }}
                value={this.state.bookName}
              />
              <TextInput
                style={[styles.formTextInput, { height: 300 }]}
                multiline
                numberOfLines={8}
                placeholder={'Description'}
                onChangeText={(text) => {
                  this.setState({
                    reasonToRequest: text,
                  });
                }}
                value={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.addRequest(
                    this.state.bookName,
                    this.state.reasonToRequest
                  );
                }}>
                <Text>Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#05b5ff',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    paddingLeft: 10,
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#05b5ff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
});
