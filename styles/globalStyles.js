import { StyleSheet, Platform, PixelRatio, Dimensions, StatusBar } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const scale = SCREEN_WIDTH / guidelineBaseWidth;
function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const screenWidth = SCREEN_WIDTH;

const globalStyles = {
  HomeScreen: StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    container: {
      padding: 16,
      paddingBottom: 48,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#6CA16B',
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 20) + 8 : 44,
      paddingBottom: 12,
      marginBottom: 12,
      borderRadius: 0,
      width: '100%',
      alignSelf: 'stretch',
    },
    headerLeft: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    headerLeftGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerIcon: {
      color: '#fff',
      fontSize: normalize(22),
    },
    headerCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: normalize(36),
      height: normalize(36),
      borderRadius: normalize(18),
      backgroundColor: '#FFF0E6',
      marginRight: 8,
    },
    headerTitle: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
    },
    headerRight: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    settingsIcon: {
      width: 22,
      height: 22,
      borderRadius: 4,
      backgroundColor: '#fff',
      opacity: 0.95,
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginLeft: 8,
    },
    profileImage: {
      width: normalize(45),
      height: normalize(45),
      borderRadius: normalize(30),
    },
    userName: {
      color: 'white',
      fontWeight: '600',
      fontSize: normalize(20),
    },
    settingsButton: {
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    balanceCard: { 
      alignItems: 'center', 
    },
    balanceLabel: { 
      color: '#3F7D20', 
      fontSize: 20,
    },
    balanceValue: { 
      color: '#3F7D20', 
      fontSize: 40, 
      fontWeight: 'bold' 
    },
    chartContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      position: 'relative',
      height: 300,
    },
    chartCenterText: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -50 }, { translateY: -60 }],
      width: 100,
    },
    centerPercentage: {
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    incomePercentage: {
      color: '#71c45a',
    },
    expensePercentage: {
      color: '#eb4d4b',
    },
    centerLabel: {
      fontSize: 12,
      color: '#3F7D20',
      textAlign: 'center',
      marginBottom: 8,
    },
    percentageContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
      gap: 10,
    },
    percentageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    percentageDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    percentageText: {
      color: '#3F7D20',
      fontSize: 15,
      fontWeight: '500',
    },
    divider: {
      height: 1,
      backgroundColor: '#CCCCCC',
      marginVertical: 10,
      marginHorizontal: 50,
    },
    bottomSection: {
    },
    shortcutsTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#3F7D20',
      marginBottom: 15,
      textAlign: 'center',
    },
    shortcuts: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
    },
    shortcutButton: {
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 50,
      width: (screenWidth - 80) / 2,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    shortcutText: { 
      fontSize: 12, 
      marginTop: 6, 
      fontWeight: '500',
      textAlign: 'center',
    },
    incomeButton: {
      backgroundColor: '#4CAF50',
    },
    incomeText: {
      color: '#FFFFFF',
    },
    expenseButton: {
      backgroundColor: '#F44336',
    },
    expenseText: {
      color: '#FFFFFF',
    },
    goalsButton: {
      backgroundColor: '#EA580C',
    },
    goalsText: {
      color: '#FFFFFF',
    },
    transactionsButton: {
      backgroundColor: '#A934DB',
    },
    transactionsText: {
      color: '#FFFFFF',
    },
    statisticsButton: {
      backgroundColor: '#F59E0B',
    },
    statisticsText: {
      color: '#FFFFFF',
    },
  }),

  Statistics_Page: StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    container: {
      padding: 16,
      paddingBottom: 48,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#6CA16B',
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 12,
      borderRadius: 0,
    },
    headerLeft: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    headerLeftGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerIcon: {
      color: '#fff',
      fontSize: normalize(22),
    },
    headerCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: normalize(36),
      height: normalize(36),
      borderRadius: normalize(18),
      backgroundColor: '#FFF0E6',
      marginRight: 8,
    },
    headerTitle: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
    },
    headerRight: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    settingsIcon: {
      width: 22,
      height: 22,
      borderRadius: 4,
      backgroundColor: '#fff',
      opacity: 0.95,
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginLeft: 8,
    },
    profileImage: {
      width: normalize(45),
      height: normalize(45),
      borderRadius: normalize(30),
    },
    userName: {
      color: 'white',
      fontWeight: '600',
      fontSize: normalize(20),
    },
    settingsButton: {
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      marginTop: 12,
      backgroundColor: '#FAF9F6',
      borderRadius: 12,
      padding: 14,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 6 },
        },
        android: {
          elevation: 3,
        },
      }),
    },
    smallTitle: {
      color: '#8B5CF6',
      fontWeight: 'bold',
      fontSize: normalize(22),
      marginBottom: 4,
    },
    bigTitle: {
      fontSize: normalize(34),
      fontWeight: 'bold',
      fontFamily: 'Poppins-ExtraBold',
      color: '#111827',
      marginBottom: 12,
    },
    horizontalLine: {
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: '100%',
      marginBottom: 20,
    },
    pickerRow: {
      flexDirection: 'row',
      marginBottom: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pickerBox: {
      width: normalize(170),
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#F8FAFC',
      justifyContent: 'center',
      alignItems: 'center',
    },
    monthNavButton: {
      paddingHorizontal: normalize(8),
      paddingVertical: normalize(6),
      marginHorizontal: normalize(8),
      borderRadius: normalize(8),
    },
    pickerText: {
      fontSize: normalize(16),
      color: '#111827',
      paddingVertical: normalize(14),
      fontWeight: '600',
    },
    chartContainer: {
      alignItems: 'center',
      marginTop: 6,
      marginBottom: 8,
    },
    legend: {
      marginTop: 6,
      paddingTop: 6,
    },
    legendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
    },
    legendDot: {
      width: normalize(12),
      height: normalize(12),
      borderRadius: 999,
      borderWidth: 0.5,
      borderColor: '#FFFFFF',
      marginRight: normalize(10),
    },
    legendText: {
      flex: 1,
      color: '#615E83',
      fontWeight: 'bold',
      fontSize: normalize(16),
    },
    legendValue: {
      color: '#6B7280',
      fontSize: normalize(16),
    },
    remainingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#E5E7EB',
      marginTop: 8,
    },
    remainingLabel: {
      color: '#374151',
      fontWeight: '700',
      fontSize: normalize(16),
    },
    remainingValue: {
      color: '#111827',
      fontWeight: '800',
      fontSize: normalize(16),
    },
    homeIndicator: {
      height: normalize(6),
      alignSelf: 'center',
      backgroundColor: '#787878',
      width: normalize(100),
      borderRadius: normalize(6),
      marginTop: 18,
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.26)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalWrapper: {
      width: '92%',
      maxWidth: 420,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 12,
      alignItems: 'center',
    },
    modalCloseButton: {
      marginTop: 12,
      backgroundColor: '#7FB56A',
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 8,
    },
    modalCloseText: {
      color: '#fff',
      fontWeight: '700',
    },
  }),

  MonthYearPicker: StyleSheet.create({
    container: {
      padding: 16,
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 12,
      alignItems: 'center',
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    iconButton: {
      padding: 6,
      width: 36,
      height: 36,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    yearContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    yearText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    monthGrid: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 6,
      marginBottom: 12,
    },
    monthButton: {
      width: '30%',
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 20,
      marginVertical: 6,
    },
    selectedMonth: {
      backgroundColor: '#97D0C3',
      paddingHorizontal: 8,
    },
    monthText: {
      fontSize: 14,
      color: '#333',
    },
    selectedMonthText: {
      color: '#fff',
      fontWeight: '700',
    },
    footer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ctrlButton: {
      flex: 1,
      marginHorizontal: 6,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: '#F2F3F4',
    },
    applyButton: {
      backgroundColor: '#7FB56A',
    },
    ctrlText: {
      fontSize: 15,
      color: '#111',
      fontWeight: '600',
    },
  }),

  FullDatePicker: StyleSheet.create({
    container: {
      padding: 12,
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    iconButton: {
      padding: 6,
      width: 36,
      height: 36,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    monthText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#222',
    },
    weekdaysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 6,
      marginBottom: 6,
    },
    weekday: {
      width: `${100/7}%`,
      textAlign: 'center',
      color: '#666',
      fontWeight: '600',
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    dayCell: {
      width: `${100/7}%`,
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dayText: {
      color: '#111',
    },
    selectedDay: {
      backgroundColor: '#3B82F6',
      borderRadius: 20,
    },
    selectedDayText: {
      color: '#fff',
      fontWeight: '700',
    },
    footer: {
      marginTop: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ctrlButton: {
      flex: 1,
      marginHorizontal: 6,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: '#F2F3F4',
    },
    applyButton: {
      backgroundColor: '#7FB56A',
    },
    ctrlText: {
      fontSize: 15,
      color: '#111',
      fontWeight: '600',
    },
  }),

  AddIncomeModal: StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    container: {
      width: '92%',
      maxWidth: 420,
      maxHeight: '90%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      alignSelf: 'center',
    },
    scrollContent: {
      paddingBottom: 20
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: '#222'
    },
    content: {
      minHeight: 120,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4
    },
    fieldContainer: {
      width: '100%',
      paddingBottom: 12
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      width: '100%'
    },
    dateInput: {
      justifyContent: 'center'
    },
    inlinePicker: {
      marginTop: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
      borderWidth: 1,
      borderColor: '#EEE'
    },
    inlinePickerContainer: {
      marginTop: 8
    },
    suggestionsBox: {
      marginTop: 6,
      borderWidth: 1,
      borderColor: '#EEE',
      backgroundColor: '#FFF',
      borderRadius: 6,
      maxHeight: 120
    },
    suggestionItem: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6'
    },
    relativeWrapper: {
      position: 'relative',
      width: '100%'
    },
    textArea: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      width: '100%',
      height: 100,
      textAlignVertical: 'top'
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 8
    },
    actionButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8
    },
    cancelButton: {
      backgroundColor: '#f0f0f0'
    },
    submitButton: {
      backgroundColor: '#4CAF50'
    },
    disabledButton: {
      backgroundColor: '#C8C8C8'
    },
    actionText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333'
    },
    disabledText: {
      color: '#6B6B6B'
    },
    required: {
      color: '#E53E3E',
      marginRight: 6,
      fontWeight: '700'
    }
  }),

  AddExpenseModal: StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    container: {
      width: '92%',
      maxWidth: 420,
      maxHeight: '90%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      alignSelf: 'center',
    },
    scrollContent: {
      paddingBottom: 20
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: '#222'
    },
    content: {
      minHeight: 120,
      paddingVertical: 12
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4
    },
    fieldContainer: {
      width: '100%',
      paddingBottom: 12
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      width: '100%'
    },
    dateInput: {
      justifyContent: 'center'
    },
    inlinePicker: {
      marginTop: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
      borderWidth: 1,
      borderColor: '#EEE'
    },
    inlinePickerContainer: {
      marginTop: 8
    },
    suggestionsBox: {
      marginTop: 6,
      borderWidth: 1,
      borderColor: '#EEE',
      backgroundColor: '#FFF',
      borderRadius: 6,
      maxHeight: 120
    },
    suggestionItem: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6'
    },
    relativeWrapper: {
      position: 'relative',
      width: '100%'
    },
    textArea: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      width: '100%',
      height: 100,
      textAlignVertical: 'top'
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 8
    },
    actionButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8
    },
    cancelButton: {
      backgroundColor: '#f0f0f0'
    },
    submitButton: {
      backgroundColor: '#4CAF50'
    },
    disabledButton: {
      backgroundColor: '#C8C8C8'
    },
    actionText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333'
    },
    disabledText: {
      color: '#6B6B6B'
    },
    required: {
      color: '#E53E3E',
      marginRight: 6,
      fontWeight: '700'
    }
  }),

  AddGoalModal: StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    container: {
      width: '92%',
      maxWidth: 420,
      maxHeight: '90%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      alignSelf: 'center',
    },
    scrollContent: {
      paddingBottom: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: '#222',
    },
    content: {
      minHeight: 120,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
    },
    fieldContainer: {
      width: '100%',
      paddingBottom: 12,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      width: '100%',
    },
    pseudoInput: {
      justifyContent: 'center',
      backgroundColor: '#FAFAFA',
    },
    dateInput: {
      justifyContent: 'center',
    },
    inlinePicker: {
      marginTop: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
      borderWidth: 1,
      borderColor: '#EEE',
    },
    inlinePickerContainer: {
      marginTop: 8,
    },
    pickerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 6,
    },
    pickerBtn: {
      padding: 8,
      borderRadius: 6,
      backgroundColor: '#F3F4F6',
    },
    pickerBtnText: {
      fontSize: 16,
    },
    pickerLabel: {
      flex: 1,
      textAlign: 'center',
      fontSize: 14,
      color: '#111',
    },
    pickerActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 8,
      gap: 8,
    },
    relativeWrapper: {
      position: 'relative',
    },
    suggestionsBox: {
      position: 'absolute',
      top: 52,
      left: 0,
      right: 0,
      borderWidth: 1,
      borderColor: '#EEE',
      backgroundColor: '#FFF',
      borderRadius: 6,
      maxHeight: 180,
      zIndex: 9999,
      elevation: 10,
    },
    suggestionItem: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    },
    textArea: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      width: '100%',
      height: 100,
      textAlignVertical: 'top',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 8,
    },
    actionButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    cancelButton: {
      backgroundColor: '#f0f0f0',
    },
    submitButton: {
      backgroundColor: '#4CAF50',
    },
    disabledButton: {
      backgroundColor: '#C8C8C8',
    },
    actionText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    disabledText: {
      color: '#6B6B6B',
    },
    required: {
      color: '#E53E3E',
      marginRight: 6,
      fontWeight: '700',
    },
  }),

  GoalsScreen: StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#F5F5F5', 
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#6CA16B',
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 20,
      borderRadius: 0,
    },
    headerLeft: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    headerLeftGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerIcon: {
      color: '#fff',
      fontSize: 22,
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginLeft: 8,
    },
    profileImage: {
      width: 45,
      height: 45,
      borderRadius: 30,
    },
    userName: {
      color: 'white',
      fontWeight: '600',
      fontSize: 20,
    },
    settingsButton: {
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      backgroundColor: '#FAF9F6',
      borderRadius: 23,
      padding: 20,
      paddingVertical: 20,
      paddingHorizontal: 15,
      width: '90%',
      height: '70%',
      alignContent: 'center',
      alignSelf: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 6 },
        },
        android: {
          elevation: 3,
        },
      }),
    },
    goalsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    goalsTitle: {
      marginLeft: 8,
      fontSize: 34,
      fontWeight: '900',
      color: '#EA580C',
      marginLeft: 8,
    },
    goalCard: {
      backgroundColor: '#FAF9F6',
      borderRadius: 23,
      padding: 12,
      marginBottom: 14,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 3,
      width: '98%',
      alignSelf: 'center',
      shadowOffset: { width: 0, height: 3 },
    },
    goalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    goalTitle: {
      fontSize: 20,
      fontWeight: '900',
      color: '#374151',
    },
    goalDue: {
      color: '#6B7280',
      fontSize: 14,
    },

    /* Progress and expanded area styles */
    progressBackground: {
      height: 10,
      backgroundColor: '#F3F4F6',
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: 8,
      marginBottom: 8,
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#3B82F6',
      borderRadius: 8,
    },
    goalAmount: {
      marginTop: 6,
      color: '#374151',
      fontWeight: '700',
    },
    expandedArea: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#EEE',
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    detailText: {
      color: '#374151',
      fontWeight: '600',
    },
    noteText: {
      color: '#6B7280',
      marginBottom: 8,
    },
    amountInput: {
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: 8,
      color: '#111827',
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
      marginTop: 8,
    },
    smallButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addBtn: {
      backgroundColor: '#10B981',
    },
    withdrawBtn: {
      backgroundColor: '#F59E0B',
    },
    deleteBtn: {
      backgroundColor: '#EF4444',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '700',
    },

    /* Add-goal floating button */
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6CA16B',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 24,
      alignSelf: 'center',
      marginTop: 12,
    },
    addText: {
      color: '#fff',
      marginLeft: 8,
      fontWeight: '700',
    },

    /* Past-due styling */
    pastDueCard: {
      opacity: 0.6,
    },
    pastDueText: {
      color: '#9CA3AF',
    },

  }),

  SettingsScreen: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#6CA16B',
      paddingHorizontal: 20,
      paddingVertical: 15,
      paddingTop: 60,
    },
    backButton: {
      padding: 5,
    },
    headerTitle: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
    },
    placeholder: {
      width: 28,
    },
    menuContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },
    menuItemText: {
      fontSize: 16,
      color: '#333333',
      fontWeight: '500',
    },
    destructiveText: {
      color: '#EB4D4B',
    },
  }),

  AboutScreen: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#6CA16B',
      paddingHorizontal: 20,
      paddingVertical: 15,
      paddingTop: 60,
    },
    backButton: {
      padding: 5,
    },
    headerTitle: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
    },
    placeholder: {
      width: 28,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    section: {
      marginBottom: 25,
    },
    appTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#3F7D20',
      textAlign: 'center',
      marginBottom: 15,
    },
    description: {
      fontSize: 16,
      color: '#333333',
      lineHeight: 22,
      textAlign: 'center',
    },
    version: {
      fontSize: 16,
      color: '#666666',
      textAlign: 'center',
      fontWeight: '500',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#3F7D20',
      marginBottom: 10,
    },
    team: {
      fontSize: 16,
      color: '#333333',
      lineHeight: 22,
    },
    member: {
      fontSize: 16,
      color: '#333333',
      lineHeight: 22,
      marginBottom: 5,
    },
    copyright: {
      fontSize: 14,
      color: '#666666',
      textAlign: 'center',
      marginBottom: 8,
    },
    disclaimer: {
      fontSize: 14,
      color: '#666666',
      textAlign: 'center',
      fontStyle: 'italic',
    },
  }),

  LoginScreen: StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center',
    },
    logo: { 
      color: 'white', 
      fontSize: 60, 
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      position: 'absolute', 
      top: 160,
      left: 0,
      right: 0,
    },
    formContainer: {
      backgroundColor: 'white',
      marginHorizontal: 20,
      borderRadius: 20, 
      paddingHorizontal: 30,
      paddingVertical: 30,
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 30,
      textAlign: 'center',
      right: 90,
    },
    fieldContainer: {
      marginBottom: 25,
    },
    input: {
      fontSize: 16,
      paddingVertical: 8,
      paddingHorizontal: 0,
    },
    underline: {
      height: 1,
      backgroundColor: '#E0E0E0',
      marginTop: 5,
    },
    button: { 
      backgroundColor: '#6CA16B', 
      paddingVertical: 10,
      width: '30%',
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: { 
      color: 'white', 
      fontWeight: 'bold',
      fontSize: 18,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E0E0E0',
    },
    dividerText: {
      color: '#666',
      fontSize: 14,
      marginHorizontal: 10,
    },
    footer: {
      alignItems: 'center',
    },
    footerText: { 
      color: '#666',
      fontSize: 16,
      textAlign: 'center',
    },
    footerLink: { 
      color: '#6CA16B',
      fontWeight: 'bold',
    },
  }),

  SignupScreen: StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center',
    },
    logo: { 
      color: 'white', 
      fontSize: 60, 
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      position: 'absolute', 
      top: 120,
      left: 0,
      right: 0,
    },
    formContainer: {
      backgroundColor: 'white',
      marginHorizontal: 20,
      borderRadius: 20, 
      paddingHorizontal: 30,
      paddingVertical: 30,
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 10,
      textAlign: 'center',
      right: 90,
    },
    fieldContainer: {
      marginBottom: 30,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 5,
    },
    input: {
      fontSize: 16,
      paddingVertical: 8,
      paddingHorizontal: 0,
    },
    underline: {
      height: 1,
      backgroundColor: '#E0E0E0',
      marginTop: 5,
    },
    button: { 
      backgroundColor: '#6CA16B', 
      paddingVertical: 10,
      width: '30%',
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: { 
      color: 'white', 
      fontWeight: 'bold',
      fontSize: 18,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E0E0E0',
    },
    dividerText: {
      color: '#666',
      fontSize: 14,
      marginHorizontal: 10,
    },
    footer: {
      alignItems: 'center',
    },
    footerText: { 
      color: '#666',
      fontSize: 16,
      textAlign: 'center',
    },
    footerLink: { 
      color: '#6CA16B',
      fontWeight: 'bold',
    },
  }),

  WelcomeScreen: StyleSheet.create({
    container: { 
      flex: 1,
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 200,
    },
    logo: { 
      color: 'white', 
      fontSize: 60, 
      fontWeight: 'bold',
      textAlign: 'center',
      letterSpacing: 0.5,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
    },
    button: { 
      backgroundColor: 'white', 
      paddingVertical: 18,
      paddingHorizontal: 40,
      borderRadius: 30, 
      width: '100%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    buttonText: { 
      color: '#6CA16B', 
      fontWeight: 'bold',
      fontSize: 20,
      letterSpacing: 0.5,
    },
    footer: {
      paddingBottom: 60,
      alignItems: 'center',
    },
    footerText: { 
      color: 'white', 
      fontSize: 16,
      textAlign: 'center',
    },
    link: {
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    }
  }),

  Onboarding1: StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 40, 
      backgroundColor: 'white' 
    },
    image: { 
      width: 100, 
      height: 100, 
      marginBottom: 20 
    },
    title: { 
      fontSize: 60, 
      fontWeight: 'bold', 
      color: '#3F7D20', 
      textAlign: 'center',
    },
    titleMain: { 
      fontSize: 60, 
      fontWeight: 'bold', 
      color: '#3F7D20', 
      textAlign: 'center',
      marginBottom: 30
    },
    description: { 
      textAlign: 'center', 
      fontSize: 18, 
      color: '#666', 
      lineHeight: 24,
      marginBottom: 30
    },
    button: { 
      backgroundColor: '#6CA16B', 
      paddingVertical: 15, 
      paddingHorizontal: 50, 
      borderRadius: 10,
      width: '50%',
      alignItems: 'center',
    },
    buttonText: { 
      color: 'white', 
      fontWeight: 'bold',
      fontSize: 20
    },
    dotsContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 30
    },
    dot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#DDD',
    },
    activeDot: {
      backgroundColor: '#6CA16B',
    },
  }),

  Onboarding2: StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      backgroundColor: 'white'
    },
    image: {
      width: 120,
      height: 120,
      marginBottom: 20
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: '#3F7D20',
      textAlign: 'center',
      marginBottom: 8

    },
    description: {
      textAlign: 'center',
      fontSize: 18,
      color: '#666',
      lineHeight: 24,
      marginBottom: 20
    },
    button: {
      backgroundColor: '#6CA16B',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 10,
      alignItems: 'center'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18
    },
    dotsContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 16
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#DDD'
    },
    activeDot: {
      backgroundColor: '#6CA16B'
    }
  }),

  Onboarding3: StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      backgroundColor: 'white'
    },
    image: {
      width: 140,
      height: 140,
      marginBottom: 20
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: '#3F7D20',
      textAlign: 'center',
      marginBottom: 12
    },
    description: {
      textAlign: 'center',
      fontSize: 16,
      color: '#666',
      lineHeight: 22,
      marginBottom: 20
    },
    button: {
      backgroundColor: '#6CA16B',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 10,
      alignItems: 'center'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18
    },
  }),

  TransactionScreen: StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    container: {
      padding: 16,
      paddingBottom: 48,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#6CA16B',
      paddingHorizontal: 16,
      paddingBottom: 12,
      paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 20) + 8 : 44,
      borderRadius: 0,
    },
    headerLeft: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    headerLeftGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerIcon: {
      color: '#fff',
      fontSize: normalize(22),
    },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 8,
  },
  profileImage: {
    width: normalize(45),
    height: normalize(45),
    borderRadius: normalize(30),
  },
  userName: {
    color: 'white',
    fontWeight: '600',
    fontSize: normalize(20),
  },
  settingsButton: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
      marginBottom: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
    },
    cardTitle: {
      color: '#2D6CDF',
      fontSize:34,
      fontWeight: '800',
      marginLeft: 6,
    },
    cardBody: {
      paddingRight: 6,
      marginBottom: 12,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 6,
    },
    addIncomeBtn: {
      flex: 0.48,
      backgroundColor: '#6CA16B',
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    addExpenseBtn: {
      flex: 0.48,
      backgroundColor: '#F56B6B',
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    addBtnText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 13,
      marginLeft: 8,
    },
    addBtnIcon: {
      marginRight: 6,
    },
    statsBtnSmall: {
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      backgroundColor: '#A934DB',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
    },
    statsBtn: {
      flex: 0.48,
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 8,
      backgroundColor: '#A934DB',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
    },
    statsBtnText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 13,
    },
    transRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#F0F0F0',
    },
    transLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    transIcon: {
      width: 28,
      height: 28,
      borderRadius: 6,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    transTitle: {
      fontWeight: '700',
      fontSize: 14,
    },
    transDate: {
      color: '#999',
      fontSize: 12,
      marginTop: 2,
    },
    transAmount: {
      fontWeight: '700',
      fontSize: 13,
      marginLeft: 8,
    },
    transAmountContainer: {
      alignItems: 'flex-end',
      minWidth: 80,
    },
    transCategory: {
      fontSize: 12,
      color: '#6B7280',
      marginTop: 4,
      textAlign: 'right',
    },
  }),

};

export default globalStyles;
