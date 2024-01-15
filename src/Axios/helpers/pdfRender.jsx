import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useApp } from '../../components/context/AppContext'
//This component handlig printing of a section of a page as pdf.
//wrap around component you want to print and supply the tilte prop.
// the component you want to print should have a ref prop whose value is printRef from AppContext
export const PrintPdf = ({ title, children }) => {
  const { printRef } = useApp()
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: title,
    pageStyle:'margin:100px',
    onAfterPrint: () => console.log('Printed PDF successfully'),
  })
  return (
    <div className="flex-col">
      {children}
      <button
        onClick={handlePrint}
        className="bg-green-400 p-3 rounded-md"
      >
        Print
      </button>
    </div>
  )
}

// import ReactDom from 'react-dom'
// import { PDFViewer } from '@react-pdf/renderer'
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#E4E4E4',
//     width: '100vw',
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// })

// // Create Document Component
// const MyDocument = (props) => {
//   console.log(props.children, 'props from pdf')

//   return (
//     <Document fullScreen  style={styles.page}>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text>
//             Section
//             {/* { props.children} */}
//           </Text>
//           <div>Text area</div>
//         </View>
//         <View style={styles.section}>
//           <Text>Section #2</Text>
//         </View>
//       </Page>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text>
//             Section
//             {/* { props.children} */}
//           </Text>
//           <div>Text area</div>
//         </View>
//         <View style={styles.section}>
//           <Text>Section #2</Text>
//         </View>
//       </Page>
//     </Document>
//   )
// }
// export const Pdf = (props) => {
//   console.log(props.children)
//   return (
//     <PDFViewer>
//       {props.children}
//       <MyDocument>{props.children}</MyDocument>
//     </PDFViewer>
//   )
// }
