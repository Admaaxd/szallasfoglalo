const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.incrementUserCount = functions.auth.user().onCreate(() => {
  const statsRef = admin.firestore().doc('stats/users');
  return admin.firestore().runTransaction(transaction => {
    return transaction.get(statsRef).then(doc => {
      const newCount = (doc.data().count || 0) + 1;
      transaction.set(statsRef, { count: newCount });
    });
  });
});