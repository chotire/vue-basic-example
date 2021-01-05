const works = [
  {
    workId: 1, // work id
    tenentCd: '', // 테넌트 코드
    corpCd: '', // 회사 코드
    qrtId: 1, // 분기 코드
    orgNm: '', // ### 조직명
    kr: {}, // ### 연결 o 및 kr { krId: 1, ..., objt: {} }
    tasks: [], // ### [ { task }, { task }, ... ]
    workOwnrEmpNo: '', // work 소유자 사원 번호
    workNm: '', // work 명
    workDtlExpl: '', // work 상세 설명
    workSttDate: 1, // work 시작 일자, *** unix time
    workEndDate: 1, // work 종료 일자, *** unix time
    workTrglvDvnCd: '', // work 목표수준 구분 코드
    workTrglvData: '', // work 목표수준 데이터
    crlvCd: '', // 커리어 레벨 코드
    dfcltCd: '', // 난이도 코드
    calcParto: 1, // 계산 달성율
    dcsnParto: 1, // 확정 달성율
    beforeCalcParto: 1, // ### 전일 계산 달성율
    beforeDcsnParto: 1, // ### 전일 확정 달성율
    appvlHistMstId: 1, // 승인 이력 마스터
    appvlStatCd: '', // 승인 상태 코드
    cstmClmnTmpId: 1, // 사용자정의 컬럼 템플릿 id
    cstmClmnData: '', // 사용자정의 컬럼 데이터
    sysAttrData: '', // 시스템 속성 데이터
    useYn: Boolean, // 사용 여부, *** 0, 1
  },
];

const objectives = [
  {
    objtId: 1, // objt id
    tenentCd: '', // 테넌트 코드
    corpCd: '', // 회사 코드
    qrtId: 1, // 분기 코드
    objtDvnCd: '', // 목표 구분 코드
    objtOrgDvnCd: '', // 목표 조직 구분 코드
    objtOrgCd: '', // 목표 조직 코드
    objtOwnrEmpNo: '', // 목표 소유자 사원 번호
    objtNm: '', // 목표 명
    objtDtlExpl: '', // 목표 상세 설명
    hrnkKr: {}, // ### 상위 kr
    krs: [], // ### kr 목록
    objtSttDate: 1, // objt 시작 일자, * unix time
    objtEndDate: 1, // objt 종료 일자, * unix time
    calcParto: 1, // 계산 달성율
    dcsnParto: 1, // 확정 달성율
    beforeCalcParto: 1, // # 전일 계산 달성율
    beforeDcsnParto: 1, // # 전일 확정 달성율
    appvlHistMstId: 1, // 승인 이력 마스터
    appvlStatCd: '', // 승인 상태 코드
    cstmClmnTmpId: 1, // 사용자정의 컬럼 템플릿 id
    cstmClmnData: '', // 사용자정의 컬럼 데이터
    sysAttrData: '', // 시스템 속성 데이터
    useYn: Boolean, // 사용 여부, * 0, 1
  },
];
console.log(works, objectives);
