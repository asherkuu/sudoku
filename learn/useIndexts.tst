# fileName.ts가 아닌 index.ts 로 사용하는 이유

import 시 파일디렉토리만 선언해도 사용가능 
ex : etc > index.ts   -> import etc from 'etc'

디렉토리 구조를 파일명 > index.ts 로 해도 좋지만
햇갈리는 경우   파일명 > 파일명.ts로 작성후
최상위 디렉토리에 index.ts를 만들어 import name from '파일명/파일명.ts' 로 전역 설정을 하기로 하자