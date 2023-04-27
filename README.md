<div align="center">
<h1> 고르다(Gorda)에 오신걸 환영합니다.</h1>
</div>

## 목차

1. [**서비스 소개**](#1)
2. [**기술 스택**](#2)
3. [**시스템 아키텍처**](#3)
4. [**주요기능 및 데모영상**](#4)
5. [**UCC 보러가기**](#5)
6. [**협업 관리**](#6)
7. [**개발 멤버 소개**](#7)
8. [**프로젝트 기간**](#8)
9. [**프로젝트 관련 문서**](#9)

<div id="1"> </div>

## 💡서비스 소개
### 고르다(Gorda) 는 기부의 투명성을 위한 블록체인 기부 프로젝트입니다.

1. 여러 기부 리스트에 따라 암호화폐를 기부할 수 있습니다.<br>
2. 기부한 내 화폐의 흐름을 블록체인의 트랜잭션 조회로 투명하게 볼 수 있습니다.<br>
3. 이달의 운영 기관을 선정해 보상을 부여함으로 기관의 투명한 운영에 동기부여를 할 수 있습니다.


<div id="2"></div>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Java-FF7800?style=for-the-badge&logo=Java&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<br>
<img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<br>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Node.js-339939?style=for-the-badge&logo=Node.js&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<br>
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/GitLab-FCA121?style=for-the-badge&logo=GitLab&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<br>
<img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=Solidity&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<br/>


<div id="3"> </div>

## 🛠 Architecture
![기부글작성1 이미지](/readme.asset/아키텍쳐.png)
<br><br><br><br>


## 기획 배경

1. 최종 사용처 및 목적 파악 불가
    - 사용자는 재단 전체에 기부를 하는 것이지, 특정 목적이나 사용처를 직접 선택할 수 없어 수동적인 기부가 되고 있음. 가끔씩 주는 소식지나 결연아동 편지 외에는 내가 기부하는 금액이 어디로 가 어떻게 쓰이는지 알 수 없음
2. 주목 받는 일부에만 기부금이 쏠림
    - 많은 단체들이 기부금을 더 많이 끌어모으기 위해 자극적으로 일부(수재민)만 강조해서 일시적으로 반짝 기부금이 모임. 평소에 계속 후원이 필요한 곳에는 돈이 고르게 분배되지 못함. (가난 포르노)
3. 중간 커미션 추적 불가
    - 중간에서 얼마나 떼먹는지 알 수 없음. 한 자선단체 직원들이 비즈니스석 탑승 및 월급 이슈. 기부자가 보기에 불필요하거나 과한 지출을 감시할 필요가 있음.
4. 기부에 대한 동기 부여 부족
    - 단순히 동정심 유발로 기부에 대한 관심을 끌기에 역부족. 재미, 투명성, 접근 기회 증가를 통해 사용자들을 끌어모을 필요가 있음.
   


## 해결 방안

1. 최종 사용처를 직접 선택할 수 있도록 함
    - 블록체인으로 내가 기부한 금액이 어떻게 흘러가는지를 기록하도록 한다.(transaction 추적)
    - 블록체인 투표 기능을 통해서 다양한 선택지를 직접 고를 수 있도록 함(아동에게 옷을 선물할지, 필기구를 선물할지 등)
2. 중간 거래 내역 확인 및 거래 중단이 가능하도록 함
    - 블록체인으로 내가 기부한 금액이 어떻게 흘러가는지를 기록하도록 한다.
    - 만일 부당한 커미션이 반복된다고 판단할 경우 기부자가 회수할 수 있도록 함(smart contract → 방법 찾아봄 / 회수가 아닌 방법으로 대응 가능한지 고민)
3. 복권, 경품 등 재미 요소 제공
    - 기부할 때마다 코인을 발행하고, 해당 코인은 자동으로 Lottery 계좌에 쌓임. 정기적으로 해당 코인들을 랜덤으로 추첨하여 해당 사용자에게 돌려주거나, 해당 사용자가 원하는 곳에 기부할 수 있도록 함. 추첨하는 과정부터 당첨금을 주는 과정 모두가 블록체인으로 관리되기 때문에 로또와 같은 주작 논란에서 자유로움.
4. 사용자의 기부 현황, 기부 목표액 표시 등
    - 사용자가 기부를 할 때마다 성취감을 얻어 기부에 대한 동기부여를 얻기 위해 기부 정도에 따른 레벨, 티어 표시 등
    - 각 기부 목록별로 목표액이 설정되어 있으면 % 표시로 얼만큼의 목표액이 모였는지 표시해 내 기부액이 얼만큼의 도움이 되었는지 수치로 표현해줌
    
    
### 메타마스크 지갑 연동 서비스
- 비트코인 지갑 서비스 중 메타마스크 지갑을 통해 서비스에 연동할 수 있습니다.
- 이더리움 지갑 플랫폼을 사용함으로 사용자 보안 체계를 강화합니다.

|   로그인 화면         |
| :--------------------------: |
|![로그인 이미지](/readme.asset/로그인.png)|

### 기부글 등록 서비스
- 이더리움 블록체인 네트워크에 기부금, 기부받을 기관, 사용처, 기부 만료 기간 등을 설정해 기부글을 등록할 수 있습니다.
- 기부글이 작성되면 etherscan 사이트에서 기부글 주소를 통해 모금액의 이동 현황을 투명하게 관리할 수 있습니다.

|   기부글 작성 화면         |
| :--------------------------: |
|![기부글작성1 이미지](/readme.asset/기부글작성1.png)|
|![기부글작성2 이미지](/readme.asset/기부글작성2.png)|
|![기부글작성3 이미지](/readme.asset/기부글작성3.png)|

### 기부글 등록 서비스
- 기부글에 사용자가 메타마스크 지갑에 있는 eth를 기부할 수 있습니다.
- 댓글, 좋아요를 남기며 모금 활동을 응원할 수 있습니다.

|   기부 화면         |
| :--------------------------: |
|![기부하기1 이미지](/readme.asset/기부하기1.png)|

### 기부글 등록 서비스
- 기부글 등록처럼 투표 또한 이더리움 블록체인 네트워크에 등록할 수 있습니다.
- 저번달에 활동한 기관들 중 기관 운영이 투명하고, 적절한 사용처에 모금 활동을 진행한 기관을 선정해 더 나은 모금 활동을 촉진할 수 있습니다.

|   투표 화면   |
| :--------------------------: |
|![투표하기1 이미지](/readme.asset/투표하기1.png)|


## 추가 사항

### 1. 거래

- 공정거래 품목 혹은 일정 품목에 관한 일정 퍼센트를 기부하게 하여 전자상거래의 모습을 갖출 수 있다.  (사회적 책임을 다하는 거래 + 회사에서 품목을 지원 받는다면 해당 기업 이미지 고취 가능성 베네핏)

## 2.보완점

- 기부 사이트 이용을 위한 유인책
- 경품 및 복권에 대한 재정의 필요
- 코인 채굴시 해당 코인 지급
- 결제 시 현금 ↔ 코인 (실제로 결제 구현이 가능한가?)
- 누구한테 기부를 할것인가? (해결을 하지 못한다면 중간에 돈 빼먹는 것을 방지 한다는 가정하에 단체에 기부)
- 댓글기능?

## [FE]

<aside>
👉 FE - CODE CONVENTION

**JavaScript**

- 세미콜론 필수 사용

**CSS**

- id, class명은 component, page 약어 + 부분 + 기능
- (ex. 메인페이지 상위 배너의 클릭 버튼일 경우 → mp-upperbanner-btn)
- style 사용 금지

**HTML**

</aside>

## [BE]

<aside>
👉 BE - CODE CONVENTION

</aside>
<br><br><br><br>


<div id="9"> </div>

## 📋 프로젝트 관련 문서
|  구분  |  링크  |
| :--------------- | :---------------: |
| 와이어프레임 | [와이어프레임 바로가기](https://www.figma.com/file/hbTk2ngvOrDZza6Yd77ITF/Design?node-id=0%3A1) |
| ERD | [ERD 바로가기](https://drive.google.com/file/d/1oD8cfmZEBlzzR1WNFogGE_1ST0NcnZqT/view?usp=sharing) |
| 빌드/배포 | [빌드/배포 바로가기]() |
| 시연 시나리오 | [시연 시나리오 바로가기]() |
| 발표자료 | [발표자료 바로가기]() |
