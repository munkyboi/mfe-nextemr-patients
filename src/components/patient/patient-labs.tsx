import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
  X
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

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
  { id: 10, name: 'Coagulation', fullName: 'Coagulation Tests' },
  { id: 11, name: 'HbA1c', fullName: 'Glycated Hemoglobin' },
  { id: 12, name: 'CRP', fullName: 'C-Reactive Protein' },
  { id: 13, name: 'ESR', fullName: 'Erythrocyte Sedimentation Rate' },
  { id: 14, name: 'Vitamin', fullName: 'Vitamin Levels' },
  { id: 15, name: 'Iron', fullName: 'Iron Studies' }
];

// Generate more sample data
const generateLabTests = () => {
  const patients = [
    'PT-7823',
    'PT-6591',
    'PT-9034',
    'PT-4527',
    'PT-3318',
    'PT-7712',
    'PT-5501',
    'PT-2296',
    'PT-8843',
    'PT-6127',
    'PT-1234',
    'PT-5678',
    'PT-9012',
    'PT-3456',
    'PT-7890',
    'PT-2468',
    'PT-1357',
    'PT-8642',
    'PT-9753',
    'PT-3141'
  ];

  const testDates = [
    '2023-04-15',
    '2023-04-16',
    '2023-04-17',
    '2023-04-18',
    '2023-04-19',
    '2023-04-20',
    '2023-04-21',
    '2023-04-22',
    '2023-04-23',
    '2023-04-24',
    '2023-04-25',
    '2023-04-26',
    '2023-04-27',
    '2023-04-28',
    '2023-04-29'
  ];

  const testDetails = [
    // CBC Tests
    {
      testType: 'CBC',
      testName: 'Hemoglobin',
      referenceRange: '13.5-17.5',
      units: 'g/dL'
    },
    {
      testType: 'CBC',
      testName: 'WBC',
      referenceRange: '4.5-11.0',
      units: '10³/µL'
    },
    {
      testType: 'CBC',
      testName: 'RBC',
      referenceRange: '4.5-5.9',
      units: '10⁶/µL'
    },
    {
      testType: 'CBC',
      testName: 'Platelets',
      referenceRange: '150-450',
      units: '10³/µL'
    },
    {
      testType: 'CBC',
      testName: 'Hematocrit',
      referenceRange: '41-50',
      units: '%'
    },
    { testType: 'CBC', testName: 'MCV', referenceRange: '80-96', units: 'fL' },
    { testType: 'CBC', testName: 'MCH', referenceRange: '27-33', units: 'pg' },
    {
      testType: 'CBC',
      testName: 'MCHC',
      referenceRange: '33-36',
      units: 'g/dL'
    },

    // LFT Tests
    { testType: 'LFT', testName: 'ALT', referenceRange: '7-55', units: 'U/L' },
    { testType: 'LFT', testName: 'AST', referenceRange: '8-48', units: 'U/L' },
    {
      testType: 'LFT',
      testName: 'Bilirubin Total',
      referenceRange: '0.1-1.2',
      units: 'mg/dL'
    },
    {
      testType: 'LFT',
      testName: 'Bilirubin Direct',
      referenceRange: '0.0-0.3',
      units: 'mg/dL'
    },
    {
      testType: 'LFT',
      testName: 'Alkaline Phosphatase',
      referenceRange: '45-115',
      units: 'U/L'
    },
    { testType: 'LFT', testName: 'GGT', referenceRange: '8-61', units: 'U/L' },
    {
      testType: 'LFT',
      testName: 'Albumin',
      referenceRange: '3.5-5.0',
      units: 'g/dL'
    },

    // Lipid Tests
    {
      testType: 'Lipid',
      testName: 'Total Cholesterol',
      referenceRange: '<200',
      units: 'mg/dL'
    },
    {
      testType: 'Lipid',
      testName: 'LDL',
      referenceRange: '<100',
      units: 'mg/dL'
    },
    {
      testType: 'Lipid',
      testName: 'HDL',
      referenceRange: '>40',
      units: 'mg/dL'
    },
    {
      testType: 'Lipid',
      testName: 'Triglycerides',
      referenceRange: '<150',
      units: 'mg/dL'
    },
    {
      testType: 'Lipid',
      testName: 'VLDL',
      referenceRange: '<30',
      units: 'mg/dL'
    },

    // Stool Tests
    {
      testType: 'Stool',
      testName: 'Occult Blood',
      referenceRange: 'Negative',
      units: ''
    },
    {
      testType: 'Stool',
      testName: 'WBC',
      referenceRange: '0-5',
      units: 'per HPF'
    },
    {
      testType: 'Stool',
      testName: 'RBC',
      referenceRange: '0-5',
      units: 'per HPF'
    },
    {
      testType: 'Stool',
      testName: 'Parasites',
      referenceRange: 'Not Seen',
      units: ''
    },

    // Urinalysis Tests
    { testType: 'UA', testName: 'pH', referenceRange: '4.5-8.0', units: '' },
    {
      testType: 'UA',
      testName: 'Protein',
      referenceRange: 'Negative',
      units: ''
    },
    {
      testType: 'UA',
      testName: 'Glucose',
      referenceRange: 'Negative',
      units: ''
    },
    {
      testType: 'UA',
      testName: 'Ketones',
      referenceRange: 'Negative',
      units: ''
    },
    {
      testType: 'UA',
      testName: 'Blood',
      referenceRange: 'Negative',
      units: ''
    },
    {
      testType: 'UA',
      testName: 'Nitrite',
      referenceRange: 'Negative',
      units: ''
    },

    // Glucose Tests
    {
      testType: 'Glucose',
      testName: 'Fasting Blood Glucose',
      referenceRange: '70-99',
      units: 'mg/dL'
    },
    {
      testType: 'Glucose',
      testName: 'Random Blood Glucose',
      referenceRange: '70-140',
      units: 'mg/dL'
    },
    {
      testType: 'Glucose',
      testName: '2-Hour Postprandial',
      referenceRange: '<140',
      units: 'mg/dL'
    },

    // Thyroid Function Tests
    {
      testType: 'TFT',
      testName: 'TSH',
      referenceRange: '0.4-4.0',
      units: 'mIU/L'
    },
    {
      testType: 'TFT',
      testName: 'Free T4',
      referenceRange: '0.8-1.8',
      units: 'ng/dL'
    },
    {
      testType: 'TFT',
      testName: 'Free T3',
      referenceRange: '2.3-4.2',
      units: 'pg/mL'
    },
    {
      testType: 'TFT',
      testName: 'Total T4',
      referenceRange: '5.0-12.0',
      units: 'µg/dL'
    },

    // Electrolytes Tests
    {
      testType: 'Electrolytes',
      testName: 'Sodium',
      referenceRange: '135-145',
      units: 'mmol/L'
    },
    {
      testType: 'Electrolytes',
      testName: 'Potassium',
      referenceRange: '3.5-5.0',
      units: 'mmol/L'
    },
    {
      testType: 'Electrolytes',
      testName: 'Chloride',
      referenceRange: '98-107',
      units: 'mmol/L'
    },
    {
      testType: 'Electrolytes',
      testName: 'Bicarbonate',
      referenceRange: '22-29',
      units: 'mmol/L'
    },
    {
      testType: 'Electrolytes',
      testName: 'Calcium',
      referenceRange: '8.5-10.5',
      units: 'mg/dL'
    },

    // Kidney Function Tests
    {
      testType: 'KFT',
      testName: 'Creatinine',
      referenceRange: '0.7-1.3',
      units: 'mg/dL'
    },
    {
      testType: 'KFT',
      testName: 'BUN',
      referenceRange: '7-20',
      units: 'mg/dL'
    },
    {
      testType: 'KFT',
      testName: 'eGFR',
      referenceRange: '>60',
      units: 'mL/min/1.73m²'
    },
    {
      testType: 'KFT',
      testName: 'Uric Acid',
      referenceRange: '3.5-7.2',
      units: 'mg/dL'
    },

    // Coagulation Tests
    {
      testType: 'Coagulation',
      testName: 'PT',
      referenceRange: '11.0-13.5',
      units: 'seconds'
    },
    {
      testType: 'Coagulation',
      testName: 'INR',
      referenceRange: '0.8-1.1',
      units: ''
    },
    {
      testType: 'Coagulation',
      testName: 'PTT',
      referenceRange: '25-35',
      units: 'seconds'
    },
    {
      testType: 'Coagulation',
      testName: 'Bleeding Time',
      referenceRange: '2-7',
      units: 'minutes'
    },

    // HbA1c Tests
    {
      testType: 'HbA1c',
      testName: 'HbA1c',
      referenceRange: '<5.7',
      units: '%'
    },

    // CRP Tests
    {
      testType: 'CRP',
      testName: 'C-Reactive Protein',
      referenceRange: '<3.0',
      units: 'mg/L'
    },
    {
      testType: 'CRP',
      testName: 'High-Sensitivity CRP',
      referenceRange: '<1.0',
      units: 'mg/L'
    },

    // ESR Tests
    {
      testType: 'ESR',
      testName: 'Erythrocyte Sedimentation Rate',
      referenceRange: '0-15',
      units: 'mm/hr'
    },

    // Vitamin Tests
    {
      testType: 'Vitamin',
      testName: 'Vitamin B12',
      referenceRange: '200-900',
      units: 'pg/mL'
    },
    {
      testType: 'Vitamin',
      testName: 'Vitamin D, 25-OH',
      referenceRange: '30-100',
      units: 'ng/mL'
    },
    {
      testType: 'Vitamin',
      testName: 'Folate',
      referenceRange: '>5.4',
      units: 'ng/mL'
    },

    // Iron Studies
    {
      testType: 'Iron',
      testName: 'Serum Iron',
      referenceRange: '60-170',
      units: 'µg/dL'
    },
    {
      testType: 'Iron',
      testName: 'Ferritin',
      referenceRange: '30-400',
      units: 'ng/mL'
    },
    {
      testType: 'Iron',
      testName: 'TIBC',
      referenceRange: '240-450',
      units: 'µg/dL'
    },
    {
      testType: 'Iron',
      testName: 'Transferrin Saturation',
      referenceRange: '20-50',
      units: '%'
    }
  ];

  const statuses = ['Normal', 'Abnormal', 'Critical'];
  const statusWeights = [0.6, 0.3, 0.1]; // 60% Normal, 30% Abnormal, 10% Critical

  const generateRandomResult = (referenceRange: string, status: string) => {
    // For numeric ranges like "70-99"
    if (/^\d+(\.\d+)?-\d+(\.\d+)?$/.test(referenceRange)) {
      const [min, max] = referenceRange.split('-').map(Number);
      let result;

      if (status === 'Normal') {
        // Generate a value within the range
        result = (Math.random() * (max - min) + min).toFixed(1);
      } else if (status === 'Abnormal') {
        // Generate a value slightly outside the range
        const isHigh = Math.random() > 0.5;
        result = isHigh
          ? (max + Math.random() * (max * 0.2)).toFixed(1)
          : (min - Math.random() * (min * 0.2)).toFixed(1);
      } else {
        // Critical
        // Generate a value far outside the range
        const isHigh = Math.random() > 0.5;
        result = isHigh
          ? (max + Math.random() * (max * 0.5)).toFixed(1)
          : (min - Math.random() * (min * 0.5)).toFixed(1);
      }

      return result;
    }

    // For ranges with < or > like "<200" or ">40"
    if (/<\d+(\.\d+)?/.test(referenceRange)) {
      const threshold = Number(referenceRange.replace('<', ''));

      if (status === 'Normal') {
        return (threshold - Math.random() * (threshold * 0.3)).toFixed(1);
      } else if (status === 'Abnormal') {
        return (threshold + Math.random() * (threshold * 0.2)).toFixed(1);
      } else {
        // Critical
        return (threshold + Math.random() * (threshold * 0.5)).toFixed(1);
      }
    }

    if (/>\d+(\.\d+)?/.test(referenceRange)) {
      const threshold = Number(referenceRange.replace('>', ''));

      if (status === 'Normal') {
        return (threshold + Math.random() * (threshold * 0.3)).toFixed(1);
      } else if (status === 'Abnormal') {
        return (threshold - Math.random() * (threshold * 0.2)).toFixed(1);
      } else {
        // Critical
        return (threshold - Math.random() * (threshold * 0.5)).toFixed(1);
      }
    }

    // For non-numeric ranges like "Negative"
    if (referenceRange === 'Negative') {
      if (status === 'Normal') {
        return 'Negative';
      } else if (status === 'Abnormal') {
        return 'Trace';
      } else {
        // Critical
        return 'Positive';
      }
    }

    if (referenceRange === 'Not Seen') {
      if (status === 'Normal') {
        return 'Not Seen';
      } else if (status === 'Abnormal') {
        return 'Few Seen';
      } else {
        // Critical
        return 'Many Seen';
      }
    }

    // Default fallback
    return '5.0';
  };

  // Generate a large dataset
  const labTests = [];
  let id = 10000;

  // Generate 200 test records
  for (let i = 0; i < 200; i++) {
    const patientId = patients[Math.floor(Math.random() * patients.length)];
    const testDate = testDates[Math.floor(Math.random() * testDates.length)];
    const testDetail =
      testDetails[Math.floor(Math.random() * testDetails.length)];

    // Randomly select status based on weights
    const randomValue = Math.random();
    let statusIndex = 0;
    let cumulativeWeight = 0;

    for (let j = 0; j < statusWeights.length; j++) {
      cumulativeWeight += statusWeights[j];
      if (randomValue <= cumulativeWeight) {
        statusIndex = j;
        break;
      }
    }

    const status = statuses[statusIndex];
    const result = generateRandomResult(testDetail.referenceRange, status);

    labTests.push({
      id: `LT-${id++}`,
      patientId,
      testDate,
      testType: testDetail.testType,
      testName: testDetail.testName,
      result,
      referenceRange: testDetail.referenceRange,
      units: testDetail.units,
      status
    });
  }

  return labTests;
};

// Generate the lab tests
const labTests = generateLabTests();

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('20');

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTestType, searchQuery]);

  // Filter records based on selected test type
  const filteredByType = selectedTestType
    ? labTests.filter((test) => test.testType === selectedTestType)
    : labTests;

  // Filter records based on search query
  const filteredRecords = searchQuery
    ? filteredByType.filter((record) => {
        const query = searchQuery.toLowerCase();
        return (
          record.patientId.toLowerCase().includes(query) ||
          record.testDate.includes(query) ||
          record.testType.toLowerCase().includes(query) ||
          record.testName.toLowerCase().includes(query) ||
          record.result.toLowerCase().includes(query) ||
          record.status.toLowerCase().includes(query)
        );
      })
    : filteredByType;

  // Sort records based on sort field and direction
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;

    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Paginate records
  const pageSizeNumber = Number.parseInt(pageSize);
  const totalPages = Math.ceil(sortedRecords.length / pageSizeNumber);
  const paginatedRecords = sortedRecords.slice(
    (currentPage - 1) * pageSizeNumber,
    currentPage * pageSizeNumber
  );

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

    // If search is active, count from filtered records
    const recordsToCount = searchQuery ? filteredRecords : labTests;

    recordsToCount.forEach((test) => {
      if (!counts[test.testType]) {
        counts[test.testType] = 0;
      }
      counts[test.testType]++;
    });

    return counts;
  };

  const testTypeCounts = getTestTypeCounts();

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page when changing page size
  };

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
              <CardHeader className="border-b-1">
                {/* Search Bar and Page Size Selector */}
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search by patient ID, test name, result..."
                      className="pl-8 pr-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 rounded-full p-0"
                        onClick={handleClearSearch}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      Show:
                    </span>
                    <Select
                      value={pageSize}
                      onValueChange={handlePageSizeChange}
                    >
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="20" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Results Count */}
                <div className="mb-2 text-sm text-muted-foreground">
                  {filteredRecords.length}{' '}
                  {filteredRecords.length === 1 ? 'result' : 'results'} found
                  {searchQuery && (
                    <>
                      {' '}
                      for <span className="font-medium">"{searchQuery}"</span>
                    </>
                  )}
                  {filteredRecords.length > 0 && (
                    <>
                      {' '}
                      | Showing {(currentPage - 1) * pageSizeNumber + 1}-
                      {Math.min(
                        currentPage * pageSizeNumber,
                        filteredRecords.length
                      )}{' '}
                      of {filteredRecords.length}
                    </>
                  )}
                </div>

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
                    {paginatedRecords.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          {searchQuery ? (
                            <div>
                              <p className="text-muted-foreground">
                                No results found for "{searchQuery}"
                              </p>
                              <Button
                                variant="link"
                                onClick={handleClearSearch}
                                className="mt-2"
                              >
                                Clear search
                              </Button>
                            </div>
                          ) : (
                            <p className="text-muted-foreground">
                              No records found
                            </p>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedRecords.map((record) => (
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
              </CardContent>
              <CardFooter>
                {/* Pagination */}
                {paginatedRecords.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        First
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        Last
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
