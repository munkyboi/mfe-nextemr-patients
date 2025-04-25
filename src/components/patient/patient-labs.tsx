import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Card } from '../ui/card';

// Sample data for test types
const testTypes = [
  { id: 1, name: 'CBC', fullName: 'Complete Blood Count' },
  { id: 2, name: 'LFT', fullName: 'Liver Function Tests' },
  { id: 3, name: 'Lipid', fullName: 'Lipid Panel' },
  { id: 4, name: 'Stool', fullName: 'Stool Examination' },
  { id: 5, name: 'UA', fullName: 'Urinalysis' },
  { id: 6, name: 'Glucose', fullName: 'Blood Glucose' },
  { id: 7, name: 'TFT', fullName: 'Thyroid Function Tests' },
  { id: 8, name: 'Electrolytes', fullName: 'Electrolytes Panel' },
  { id: 9, name: 'KFT', fullName: 'Kidney Function Tests' },
  { id: 10, name: 'Coagulation', fullName: 'Coagulation Tests' }
];

// Sample data for laboratory tests
const labTests = [
  {
    id: 'LT-10042',
    patientId: 'PT-7823',
    testDate: '2023-04-15',
    testType: 'CBC',
    testName: 'Hemoglobin',
    result: '14.2',
    referenceRange: '13.5-17.5',
    units: 'g/dL',
    status: 'Normal'
  },
  {
    id: 'LT-10043',
    patientId: 'PT-7823',
    testDate: '2023-04-15',
    testType: 'CBC',
    testName: 'WBC',
    result: '7.2',
    referenceRange: '4.5-11.0',
    units: '10³/µL',
    status: 'Normal'
  },
  {
    id: 'LT-10044',
    patientId: 'PT-7823',
    testDate: '2023-04-15',
    testType: 'CBC',
    testName: 'Platelets',
    result: '250',
    referenceRange: '150-450',
    units: '10³/µL',
    status: 'Normal'
  },
  {
    id: 'LT-10045',
    patientId: 'PT-6591',
    testDate: '2023-04-15',
    testType: 'LFT',
    testName: 'ALT',
    result: '65',
    referenceRange: '7-55',
    units: 'U/L',
    status: 'Abnormal'
  },
  {
    id: 'LT-10046',
    patientId: 'PT-6591',
    testDate: '2023-04-15',
    testType: 'LFT',
    testName: 'AST',
    result: '72',
    referenceRange: '8-48',
    units: 'U/L',
    status: 'Abnormal'
  },
  {
    id: 'LT-10047',
    patientId: 'PT-6591',
    testDate: '2023-04-15',
    testType: 'LFT',
    testName: 'Bilirubin Total',
    result: '1.2',
    referenceRange: '0.1-1.2',
    units: 'mg/dL',
    status: 'Normal'
  },
  {
    id: 'LT-10048',
    patientId: 'PT-9034',
    testDate: '2023-04-16',
    testType: 'Lipid',
    testName: 'Total Cholesterol',
    result: '245',
    referenceRange: '<200',
    units: 'mg/dL',
    status: 'Abnormal'
  },
  {
    id: 'LT-10049',
    patientId: 'PT-9034',
    testDate: '2023-04-16',
    testType: 'Lipid',
    testName: 'LDL',
    result: '162',
    referenceRange: '<100',
    units: 'mg/dL',
    status: 'Abnormal'
  },
  {
    id: 'LT-10050',
    patientId: 'PT-9034',
    testDate: '2023-04-16',
    testType: 'Lipid',
    testName: 'HDL',
    result: '38',
    referenceRange: '>40',
    units: 'mg/dL',
    status: 'Abnormal'
  },
  {
    id: 'LT-10051',
    patientId: 'PT-9034',
    testDate: '2023-04-16',
    testType: 'Lipid',
    testName: 'Triglycerides',
    result: '220',
    referenceRange: '<150',
    units: 'mg/dL',
    status: 'Abnormal'
  },
  {
    id: 'LT-10052',
    patientId: 'PT-4527',
    testDate: '2023-04-16',
    testType: 'Stool',
    testName: 'Occult Blood',
    result: 'Negative',
    referenceRange: 'Negative',
    units: '',
    status: 'Normal'
  },
  {
    id: 'LT-10053',
    patientId: 'PT-4527',
    testDate: '2023-04-16',
    testType: 'Stool',
    testName: 'WBC',
    result: '0-2',
    referenceRange: '0-5',
    units: 'per HPF',
    status: 'Normal'
  },
  {
    id: 'LT-10054',
    patientId: 'PT-4527',
    testDate: '2023-04-16',
    testType: 'Stool',
    testName: 'RBC',
    result: '0-1',
    referenceRange: '0-5',
    units: 'per HPF',
    status: 'Normal'
  },
  {
    id: 'LT-10055',
    patientId: 'PT-3318',
    testDate: '2023-04-17',
    testType: 'UA',
    testName: 'pH',
    result: '6.5',
    referenceRange: '4.5-8.0',
    units: '',
    status: 'Normal'
  },
  {
    id: 'LT-10056',
    patientId: 'PT-3318',
    testDate: '2023-04-17',
    testType: 'UA',
    testName: 'Protein',
    result: 'Trace',
    referenceRange: 'Negative',
    units: '',
    status: 'Abnormal'
  },
  {
    id: 'LT-10057',
    patientId: 'PT-3318',
    testDate: '2023-04-17',
    testType: 'UA',
    testName: 'Glucose',
    result: 'Negative',
    referenceRange: 'Negative',
    units: '',
    status: 'Normal'
  },
  {
    id: 'LT-10058',
    patientId: 'PT-7712',
    testDate: '2023-04-17',
    testType: 'Glucose',
    testName: 'Fasting Blood Glucose',
    result: '126',
    referenceRange: '70-99',
    units: 'mg/dL',
    status: 'Abnormal'
  },
  {
    id: 'LT-10059',
    patientId: 'PT-7712',
    testDate: '2023-04-17',
    testType: 'Glucose',
    testName: 'HbA1c',
    result: '7.2',
    referenceRange: '<5.7',
    units: '%',
    status: 'Abnormal'
  },
  {
    id: 'LT-10060',
    patientId: 'PT-5501',
    testDate: '2023-04-18',
    testType: 'TFT',
    testName: 'TSH',
    result: '4.8',
    referenceRange: '0.4-4.0',
    units: 'mIU/L',
    status: 'Abnormal'
  },
  {
    id: 'LT-10061',
    patientId: 'PT-5501',
    testDate: '2023-04-18',
    testType: 'TFT',
    testName: 'Free T4',
    result: '0.8',
    referenceRange: '0.8-1.8',
    units: 'ng/dL',
    status: 'Normal'
  },
  {
    id: 'LT-10062',
    patientId: 'PT-5501',
    testDate: '2023-04-18',
    testType: 'TFT',
    testName: 'Free T3',
    result: '2.5',
    referenceRange: '2.3-4.2',
    units: 'pg/mL',
    status: 'Normal'
  },
  {
    id: 'LT-10063',
    patientId: 'PT-2296',
    testDate: '2023-04-18',
    testType: 'Electrolytes',
    testName: 'Sodium',
    result: '148',
    referenceRange: '135-145',
    units: 'mmol/L',
    status: 'Abnormal'
  },
  {
    id: 'LT-10064',
    patientId: 'PT-2296',
    testDate: '2023-04-18',
    testType: 'Electrolytes',
    testName: 'Potassium',
    result: '5.8',
    referenceRange: '3.5-5.0',
    units: 'mmol/L',
    status: 'Abnormal'
  },
  {
    id: 'LT-10065',
    patientId: 'PT-2296',
    testDate: '2023-04-18',
    testType: 'Electrolytes',
    testName: 'Chloride',
    result: '110',
    referenceRange: '98-107',
    units: 'mmol/L',
    status: 'Abnormal'
  },
  {
    id: 'LT-10066',
    patientId: 'PT-8843',
    testDate: '2023-04-19',
    testType: 'KFT',
    testName: 'Creatinine',
    result: '1.8',
    referenceRange: '0.7-1.3',
    units: 'mg/dL',
    status: 'Abnormal'
  },
  {
    id: 'LT-10067',
    patientId: 'PT-8843',
    testDate: '2023-04-19',
    testType: 'KFT',
    testName: 'BUN',
    result: '28',
    referenceRange: '7-20',
    units: 'mg/dL',
    status: 'Abnormal'
  },
  {
    id: 'LT-10068',
    patientId: 'PT-8843',
    testDate: '2023-04-19',
    testType: 'KFT',
    testName: 'eGFR',
    result: '45',
    referenceRange: '>60',
    units: 'mL/min/1.73m²',
    status: 'Abnormal'
  },
  {
    id: 'LT-10069',
    patientId: 'PT-6127',
    testDate: '2023-04-19',
    testType: 'Coagulation',
    testName: 'PT',
    result: '16.2',
    referenceRange: '11.0-13.5',
    units: 'seconds',
    status: 'Abnormal'
  },
  {
    id: 'LT-10070',
    patientId: 'PT-6127',
    testDate: '2023-04-19',
    testType: 'Coagulation',
    testName: 'INR',
    result: '1.4',
    referenceRange: '0.8-1.1',
    units: '',
    status: 'Abnormal'
  },
  {
    id: 'LT-10071',
    patientId: 'PT-6127',
    testDate: '2023-04-19',
    testType: 'Coagulation',
    testName: 'PTT',
    result: '42',
    referenceRange: '25-35',
    units: 'seconds',
    status: 'Abnormal'
  }
];

type SortDirection = 'asc' | 'desc' | null;
type SortField =
  | 'patientId'
  | 'testDate'
  | 'testType'
  | 'testName'
  | 'result'
  | 'status'
  | null;

export function PatientLabs() {
  const [selectedTestType, setSelectedTestType] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Filter records based on selected test type
  const filteredRecords = selectedTestType
    ? labTests.filter((test) => test.testType === selectedTestType)
    : labTests;

  // Sort records based on sort field and direction
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;

    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Handle sort click
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Render sort icon
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;

    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'text-green-600';
      case 'Abnormal':
        return 'text-amber-600';
      case 'Critical':
        return 'text-red-600';
      default:
        return '';
    }
  };

  // Get test type counts
  const getTestTypeCounts = () => {
    const counts: Record<string, number> = {};

    labTests.forEach((test) => {
      if (!counts[test.testType]) {
        counts[test.testType] = 0;
      }
      counts[test.testType]++;
    });

    return counts;
  };

  const testTypeCounts = getTestTypeCounts();

  return (
    <div className="fluid mx-auto">
      <div className="flex flex-col sm:flex-row flex-nowrap gap-y-4 sm:gap-4">
        <div className="w-full sm:w-[200px] flex flex-col justify-start items-center">
          <div className="sticky top-[64px] h-[calc(100dvh-220px)] w-full">
            <ScrollArea className="h-full w-full rounded-md border bg-white">
              <ul>
                <li
                  className={cn(
                    'cursor-pointer px-3 py-2 hover:bg-muted border-b-1',
                    selectedTestType === null && 'bg-muted'
                  )}
                  onClick={() => setSelectedTestType(null)}
                >
                  All Test Types{' '}
                  <span className="ml-1 text-muted-foreground">
                    ({labTests.length})
                  </span>
                </li>
                {testTypes.map((type) => (
                  <li
                    key={type.id}
                    className={cn(
                      'cursor-pointer px-3 py-2 hover:bg-muted border-b-1',
                      selectedTestType === type.name && 'bg-muted'
                    )}
                    onClick={() =>
                      testTypeCounts[type.name] &&
                      setSelectedTestType(type.name)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span>{type.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {type.fullName}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        ({testTypeCounts[type.name] || 0})
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </div>
        <div className="flex-grow">
          <div className="gap-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('patientId')}
                    >
                      <div className="flex items-center">
                        Patient ID
                        {renderSortIcon('patientId')}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('testDate')}
                    >
                      <div className="flex items-center">
                        Test Date
                        {renderSortIcon('testDate')}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('testType')}
                    >
                      <div className="flex items-center">
                        Test Type
                        {renderSortIcon('testType')}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('testName')}
                    >
                      <div className="flex items-center">
                        Test Name
                        {renderSortIcon('testName')}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer text-right"
                      onClick={() => handleSort('result')}
                    >
                      <div className="flex items-center justify-end">
                        Result
                        {renderSortIcon('result')}
                      </div>
                    </TableHead>
                    <TableHead>Reference Range</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        {renderSortIcon('status')}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        No records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {record.patientId}
                        </TableCell>
                        <TableCell>{record.testDate}</TableCell>
                        <TableCell>{record.testType}</TableCell>
                        <TableCell>{record.testName}</TableCell>
                        <TableCell className="text-right">
                          {record.result}
                        </TableCell>
                        <TableCell>{record.referenceRange}</TableCell>
                        <TableCell>{record.units}</TableCell>
                        <TableCell className={getStatusColor(record.status)}>
                          {record.status}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
