// EDI Transaction Types
export const EDI_TYPES = {
  ELIGIBILITY_REQUEST: '270',
  ELIGIBILITY_RESPONSE: '271',
  CLAIM_SUBMISSION: '837',
  CLAIM_STATUS_REQUEST: '276',
  CLAIM_STATUS_RESPONSE: '277',
  PAYMENT_ADVICE: '835'
};

// Mock clearinghouse endpoints
const CLEARINGHOUSE_ENDPOINTS = {
  ELIGIBILITY: '/api/eligibility',
  CLAIM_SUBMISSION: '/api/claims',
  CLAIM_STATUS: '/api/claim-status',
  PAYMENT: '/api/payment'
};

// Sample 270 Eligibility Request Template
const create270Request = (patientData) => {
  return {
    transactionType: '270',
    sender: {
      id: 'SCM001',
      name: 'SCM Healthcare'
    },
    receiver: {
      id: patientData.insuranceProvider,
      name: patientData.insuranceProvider
    },
    subscriber: {
      memberId: patientData.memberId,
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      dob: patientData.dateOfBirth,
      gender: patientData.gender
    },
    serviceType: patientData.serviceType,
    date: new Date().toISOString()
  };
};

// Sample 837 Claim Submission Template
const create837Request = (claimData) => {
  return {
    transactionType: '837',
    controlNumber: `837_${Date.now()}`,
    sender: {
      id: 'SCM001',
      name: 'SCM Healthcare',
      taxId: '123456789'
    },
    receiver: {
      id: claimData.insuranceProvider,
      name: claimData.insuranceProvider
    },
    claim: {
      claimId: claimData.id,
      patientInfo: {
        memberId: claimData.memberId,
        firstName: claimData.patientName.split(' ')[0],
        lastName: claimData.patientName.split(' ')[1],
        dob: claimData.dateOfBirth,
        gender: claimData.gender
      },
      serviceInfo: {
        date: claimData.submissionDate,
        procedureCodes: claimData.procedureCodes,
        diagnosisCodes: claimData.diagnosisCodes,
        placeOfService: claimData.placeOfService,
        amount: claimData.amount,
        provider: {
          npi: '1234567890',
          firstName: 'John',
          lastName: 'Doe'
        }
      }
    }
  };
};

// Sample 835 Payment Advice Template
const create835Response = (paymentData) => {
  return {
    transactionType: '835',
    paymentInfo: {
      paymentMethod: paymentData.paymentMethod,
      paymentAmount: paymentData.amount,
      paymentDate: paymentData.date,
      checkNumber: paymentData.checkNumber
    },
    claimAdjustments: paymentData.adjustments || [],
    providerInfo: {
      npi: '1234567890',
      name: 'SCM Healthcare'
    },
    payerInfo: {
      id: paymentData.payerId,
      name: paymentData.payerName
    }
  };
};

// Enhanced EDI Response Handler
const handleEDIResponse = (response) => {
  switch (response.transactionType) {
    case '271':
      return {
        status: response.eligibilityStatus,
        coverage: response.coverageDetails,
        effectiveDate: response.effectiveDate,
        planType: response.planType,
        copay: response.copayAmount,
        deductible: response.deductibleAmount,
        benefitDetails: response.benefitDetails || {},
        planLimits: response.planLimits || {}
      };
    case '277':
      return {
        status: response.claimStatus,
        message: response.statusMessage,
        adjudicationDate: response.adjudicationDate,
        paymentAmount: response.paymentAmount,
        denialReason: response.denialReason,
        additionalInfo: response.additionalInfo
      };
    case '835':
      return {
        paymentStatus: response.paymentStatus,
        amount: response.paymentAmount,
        date: response.paymentDate,
        method: response.paymentMethod,
        adjustments: response.adjustments,
        remittanceAdvice: response.remittanceAdvice
      };
    default:
      return response;
  }
};

// Mock API Calls
export const ediService = {
  // Check eligibility (270/271)
  async checkEligibility(patientData) {
    try {
      const request = create270Request(patientData);
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            transactionType: '271',
            eligibilityStatus: 'Active',
            coverageDetails: 'Full Coverage',
            effectiveDate: '2024-01-01',
            planType: 'PPO',
            copayAmount: 25.00,
            deductibleAmount: 1000.00
          });
        }, 1000);
      });
      return handleEDIResponse(response);
    } catch (error) {
      console.error('EDI 270/271 Error:', error);
      throw error;
    }
  },

  // Submit claim (837)
  async submitClaim(claimData) {
    try {
      const request = create837Request(claimData);
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            transactionType: '837',
            status: 'Accepted',
            claimId: claimData.id,
            acknowledgementCode: 'A1',
            message: 'Claim received successfully'
          });
        }, 1500);
      });
      return response;
    } catch (error) {
      console.error('EDI 837 Error:', error);
      throw error;
    }
  },

  // Check claim status (276/277)
  async checkClaimStatus(claimId) {
    try {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            transactionType: '277',
            claimStatus: 'In Process',
            statusMessage: 'Claim is being processed',
            adjudicationDate: new Date().toISOString(),
            paymentAmount: null
          });
        }, 800);
      });
      return handleEDIResponse(response);
    } catch (error) {
      console.error('EDI 276/277 Error:', error);
      throw error;
    }
  }
}; 