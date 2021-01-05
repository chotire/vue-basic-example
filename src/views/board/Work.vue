<template>
  <div>
    <work-board :items="items">
      <!-- <template #footer="{ item }">{{ item }}</template> -->
    </work-board>
  </div>
</template>

<script>
import { WorkBoard } from '@/components/OKR';

export default {
  name: 'Work',
  components: {
    WorkBoard,
  },
  data() {
    return {
      items: [
        {
          workId: 1, // work id
          orgNm: '글로벌사업팀', // ### 조직명
          kr: { krId: 1, krNm: '그룹내 AI 도입 가능 시스템 5개 확보 및 손익 분석 완료', objt: { objtId: 1, objtNm: '(혁신) 분기내 투자 받을 수 있는 완벽한 분석과 계획을 만들자' } }, // ### 연결 o 및 kr { krId: 1, ..., objt: {} }
          tasks: [
            { taksId: 1, taskStatCd: 1 },
            { taksId: 2, taskStatCd: 1 },
            { taksId: 3, taskStatCd: 1 },
            { taksId: 4, taskStatCd: 2 },
            { taksId: 5, taskStatCd: 2 },
            { taksId: 6, taskStatCd: 2 },
            { taksId: 7, taskStatCd: 2 },
            { taksId: 8, taskStatCd: 2 },
            { taksId: 9, taskStatCd: 3 },
            { taksId: 10, taskStatCd: 4 },
            { taksId: 11, taskStatCd: 4 },
            { taksId: 12, taskStatCd: 4 },
          ], // ### [ { task }, { task }, ... ]
          workNm: '그룹 시스템 리스트 확보', // work 명
          workEndDate: 1587567600000, // work 종료 일자, *** unix time
          workTrglvDvnCd: '%', // work 목표수준 구분 코드
          workTrglvData: '', // work 목표수준 데이터
          dcsnParto: 20, // 확정 달성율
          beforeDcsnParto: 6, // ### 전일 확정 달성율
        },
        {
          workId: 2, // work id
          orgNm: 'Benfit Work Group', // ### 조직명
          kr: { krId: 1, krNm: '시스템 고도화 프로젝트 계획 및 투입 인력 확보', objt: { objtId: 1, objtNm: '(성장) 프로젝트 왕창 수주하자' } }, // ### 연결 o 및 kr { krId: 1, ..., objt: {} }
          tasks: [
            { taksId: 1, taskStatCd: 1 },
            { taksId: 3, taskStatCd: 1 },
            { taksId: 6, taskStatCd: 2 },
            { taksId: 7, taskStatCd: 2 },
            { taksId: 8, taskStatCd: 2 },
            { taksId: 9, taskStatCd: 3 },
            { taksId: 11, taskStatCd: 4 },
            { taksId: 12, taskStatCd: 4 },
          ], // ### [ { task }, { task }, ... ]
          workNm: '매출 상승 방안 기획', // work 명
          workEndDate: 1590332400000, // work 종료 일자, *** unix time
          workTrglvDvnCd: '%', // work 목표수준 구분 코드
          workTrglvData: '', // work 목표수준 데이터
          dcsnParto: 37, // 확정 달성율
          beforeDcsnParto: 2, // ### 전일 확정 달성율
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
