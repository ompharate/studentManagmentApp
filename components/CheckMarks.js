import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { UserAuth } from "../context/UserAuth";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
const CheckMarks = () => {
  const { user } = UserAuth();
  const [attendanceData, setAttendanceData] = useState([]);
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const newDataArr = [];
        const querySnapshot = await getDocs(
          query(collection(db, "marks"), where("roll", "==", user.roll))
        );
        querySnapshot.forEach((doc) => {
          if (doc) newDataArr.push(doc.data());
        });
        setAttendanceData(newDataArr);
      } catch (error) {
        error;
      }
    };
    fetchAttendance();
  }, []);

  return (
    <>
      <Text style={{ fontSize: 20, padding: 10, color: "grey" }}>Marks</Text>
      <ScrollView>
      <View className="mb-48">
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.headerCell}>Label</Text>
              <Text style={styles.headerCell}>Roll</Text>
              <Text style={styles.headerCell}>Received</Text>
              <Text style={styles.headerCell}>OutOf</Text>
              <Text style={styles.headerCell}>Subject</Text>
            </View>
            <ScrollView>
              {attendanceData.map((data, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.cell}>{data.label}</Text>
                  <Text style={styles.cell}>{data.roll}</Text>
                  <Text style={styles.cell}>{data.received}</Text>
                  <Text style={styles.cell}>{data.outof}</Text>
                  <Text style={styles.cell}>{data.activeSubject}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    overflow: "hidden",
    padding: 10,
  },
  tableRow: {
    padding: 2,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerCell: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#B5C0D0",
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});
export default CheckMarks;
