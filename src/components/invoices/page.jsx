import React from 'react';
// import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// logo-base.js should export a proper base64 string like:
// export const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
// import { logoBase64 } from './logo-base';

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'column',
//         backgroundColor: 'white',
//         padding: 20
//     },
//     headerStyle: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         width: "100%",
//         padding: 10,
//         marginBottom: 10
//     },
//     column: {
//         flexDirection: "column",
//     },
//     columnEnd: {
//         flexDirection: "column",
//         alignItems: "flex-end"
//     },
//     textItem: {
//         fontSize: 10,
//         marginBottom: 5,
//     },
//     line: {
//         height: 1,
//         width: "100%",
//         backgroundColor: "#A6A6A6",
//         marginVertical: 10
//     },
//     logo: {
//         width: 150,
//         height: 'auto', // Ensures proper aspect ratio
//         alignSelf: 'center',
//         marginVertical: 10
//     },
//     title:{
//         color: "#0057A8",
//         fontWeight: "bold"
//     },
//     textSmll:{
//         fontSize: 10
//     }
// });

// const Invoice = () => {
//     // Validate the base64 string (simple check)
//     const isValidBase64 = logoBase64 &&
//         (logoBase64.startsWith('data:image/png;base64,') ||
//             logoBase64.startsWith('data:image/jpeg;base64,') ||
//             logoBase64.startsWith('data:image/svg+xml;base64,'));

//     return (
//         <Document>
//             <Page size="A4" style={styles.page}>
//                 <View style={styles.headerStyle}>
//                     <View style={styles.column}>
//                         <Text style={styles.textItem}>From: Giantibis.com</Text>
//                         <Text style={styles.textItem}>Subject: E-Ticket ID #01213</Text>
//                     </View>
//                     <View style={styles.columnEnd}>
//                         <Text style={styles.textItem}>Date: 9 January 2025 3:12 AM</Text>
//                         <Text style={styles.textItem}>To: sunjessica05@gmail.com</Text>
//                     </View>
//                 </View>
//                 <View style={styles.line} />
//                 <View style={styles.line} />
//                 <View>
//                     <Text style={styles.title}>Trip Detail</Text>
//                     <Text style={styles.textSmll}>Universe Noble-37 (Mini Van 15 Seats)</Text>
//                 </View>
//             </Page>
//         </Document>
//     );
// };

export default function Invoice() {
  return (
    <div>Invoice</div>
  )
}
