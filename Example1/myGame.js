room = game.createRoom("room", "배경-1.png") // 방 생성

room.door = room.createObject("door", "문-오른쪽-닫힘.png") // 문 생성
room.door.setWidth(136) // 크기 조절
room.locateObject(room.door, 1060, 300) // 문 배치
room.door.lock() // door 상태를 locked로 변경

room.door.onClick = function() { // door를 클릭했을 때
	if(room.door.isClosed()){ // door가 closed 상태이면
		room.door.open() // door의 상태를 open으로 바꿈
	} else if (room.door.isOpened()){ // door가 opened 상태이면
		game.clear() // 게임 클리어
	} else if (room.door.isLocked()){ // door가 locked 상태이면
		printMessage("문이 잠겨있다") // 메시지 출력
	}
}

room.door.onOpen = function() { // door 상태가 open으로 변경되면 실행
	room.door.setSprite("문-오른쪽-열림.png") // 열린 문으로 변경
}
//<키패드>
room.keypad = room.createObject("keypad", "숫자키-우.png") // 오브젝트 생성
room.keypad.setWidth(50) // 크기 조절
room.locateObject(room.keypad, 930, 250) // 위치 변경

room.keypad.onClick = function() {
	printMessage("비밀번호를 입력하시오")
	showKeypad("number", "4767" , function(){ // 키패드 1 - 숫자4자리
		room.door.unlock() // door의 잠금을 연다
		printMessage("잠금장치가 열리는 소리가 들렸다")
	 })
}
//<선반>
room.shelf = room.createObject("shelf", "선반-좌.png")
room.shelf.setWidth(460)
room.locateObject(room.shelf, 250, 150)
//<화분>
room.plant = room.createObject("plant", "식물1.png")
room.plant.setWidth(150)
room.locateObject(room.plant, 1200, 400)
//<페퍼로니>
room.pepe = room.createObject("pepe", "페퍼로니.png")
room.pepe.setWidth(100)
room.locateObject(room.pepe, 1200, 600)
room.pepe.onClick = function() {
	printMessage("이 화분은 페퍼로니 식물인가 보다...")
}
//<책>
room.book = room.createObject("book", "책3-1.png")
room.book.setWidth(80)
room.locateObject(room.book, 100, 140)
room.book.onClick = function() {
	showImageViewer("종이.png", "책.txt"); // 이미지 출력
}
//<책2>
room.book2 = room.createObject("book2", "책1-1.png")
room.book2.setWidth(100)
room.locateObject(room.book2, 200, 140)
room.book2.onClick = function() {
	printMessage("(먼지가 소복소복)")
}
//<책3>
room.book3 = room.createObject("book3", "책2-1.png")
room.book3.setWidth(80)
room.locateObject(room.book3, 400, 100)
room.book3.onClick = function() {
	showImageViewer("종이.png", "책2.txt"); // 이미지 출력
}
//<지구본>
room.earth = room.createObject("earth", "지구본-2.png")
room.earth.setWidth(80)
room.locateObject(room.earth, 300, 80)
room.earth.onClick = function() {
	printMessage("그냥 지구본이다")
}
//<카펫>
room.carpet = room.createObject("carpet", "카펫.png")
room.carpet.setWidth(400)
room.locateObject(room.carpet, 550, 600)
room.carpet.onClick = function() {
	printMessage("빨간색은 꼭 피색 같다")
}
//<리모컨>
room.control = room.createObject("control", "리모컨.png")
room.control.setWidth(100)
room.locateObject(room.control, 600, 600)
room.control.onClick = function() {
	printMessage("6번에 빨간색 피가 묻어 있다...")
}
//<열쇠>
room.key = room.createObject("key", "열쇠.png")
room.key.setWidth(50)
room.locateObject(room.key, 650, 140)
//<액자>
room.draw = room.createObject("draw", "액자2-1.png")
room.draw.setWidth(150)
room.locateObject(room.draw, 650, 140)
//<캐비닛>
room.cabinet = room.createObject("cabinet", "캐비닛-0.png")
room.cabinet.setWidth(300)
room.locateObject(room.cabinet, 230, 420)
//<배터리>
room.battery = room.createObject("battery", "건전지.png")
room.battery.setWidth(50)
room.locateObject(room.battery, 230, 400)

room.battery.hide()

room.cabinet.onOpen = function() {
	room.cabinet.setSprite("캐비닛-1.png")
	room.battery.show()
}
room.cabinet.onClose = function() {
	room.cabinet.setSprite("캐비닛-0.png")
	room.battery.hide() 
}
//<텔레비전>
room.tv = room.createObject("tv", "TV2-1.png") 
room.tv.setWidth(200)
room.locateObject(room.tv, 250, 250)

//<액자 이동>
room.draw.move = true // 플래그 변수
room.draw.onDrag = function(direction){ // 드래그 모션 direction - Up, Down, Left, Right
	if(direction == "Right" && room.draw.move){ // 오른쪽으로 드래그 했으면
		printMessage("그림을 밀어버렸다!")
		room.draw.moveX(200) // X 방향으로 200 이동
		room.draw.moveY(-40) // Y 방향으로 -40 이동
		room.draw.move = false // 이후에는 더 이상 움직이지 않도록 합니다.
	} else {
		printMessage("움직이지 않는다")
	}
}
//<열쇠 사용 - 캐비닛 클릭>
room.key.onClick = function() { //열쇠를 눌렀을 때
	room.key.pick() //열쇠 줍기
}
room.cabinet.onClick = function() {
	if(game.getHandItem() == room.key) { // 열쇠를 들고 있으면
		printMessage("서랍을 열었다")
		room.cabinet.open()
	} else {
		room.cabinet.close()
		printMessage("서랍이 잠겨 있다")
	}
}
//<배터리 사용>
room.battery.onClick = function() { 
	room.battery.pick() 
}

room.tv.onClick = function() {
	if(game.getHandItem() == room.battery) { 
		printMessage("이제 TV를 킬 수 있다")
		showVideoPlayer("Wildlife.wmv") // 비디오 재생
	} else {	
		printMessage("TV 배터리가 없다")
	}
}

//<전화기>
room.phone = room.createObject("phone", "전화기-오른쪽.png")
room.phone.setWidth(30)
room.locateObject(room.phone, 830, 250)
room.phone.onClick = function() {
	printMessage("전화기 너머로 아무소리도 들리지 않는다...") //메세지 출력
	playSound("alarm.wav") // 오디오 재생 
}
//<라디오>
room.radio = room.createObject("radio", "라디오.png")
room.radio.setWidth(90)
room.locateObject(room.radio, 100, 570)
room.radio.onClick = function() {
	showAudioPlayer("chick.wav") // 플레이어
	printMessage("과연 의미가 있는 소리일까?")
}
//<책상, 포스트잇>
room.table = room.createObject("table", "테이블-우.png") // 테이블 생성
room.table.setWidth(300)
room.locateObject(room.table, 550, 350)

room.table2 = room.createObject("table2", "교탁-오른쪽.png") //테이블2 생성
room.table2.setWidth(300)
room.locateObject(room.table2, 850, 400)

room.postit = room.createObject("postit", "포스트잇.png") //포스트잇 생성
room.postit.setWidth(45)
room.locateObject(room.postit, 850, 340)

room.postit.onClick = function() {
	showImageViewer("종이.png", "포스트잇.txt"); // 포스트잇 이미지와 텍스트 출력
}
 
//<상자, 쿠키>
room.box = room.createObject("box", "상자3-닫힘.png") //상자 생성
room.cookie = room.createObject("cookie", "쿠키.png") //쿠키 생성

room.box.setWidth(300)
room.cookie.setWidth(100)

room.locateObject(room.box, 250, 600)
room.locateObject(room.cookie, 250, 590)

room.cookie.hide()  //쿠키 숨기기

room.box.onClick = function() { //box 클릭했을 때
	if(room.box.isOpened()){ //opened 상태인 경우
		room.box.close() //close
	} else if(room.box.isClosed()){ //closed인 경우
		room.box.open() //open
	} else {
		// do nothing
	}
}

room.box.onOpen = function() {
	room.box.setSprite("상자3-열림.png") //열린 그림으로 변경
	room.cookie.show() //쿠키 보이기
}
room.box.onClose = function() {
	room.box.setSprite("상자3-닫힘.png") //닫힌 그림으로 변경
	room.cookie.hide() //쿠키 숨기기
}
//<장식 상자>
room.boxes = room.createObject("boxes", "상자-2-닫힘.png") //상자 생성
room.boxes.setWidth(250)
room.locateObject(room.boxes, 1000, 550)

room.boxes.onClick = function() { //box 클릭했을 때
	if(room.boxes.isOpened()){ //opened 상태인 경우
		room.boxes.close() //close
	} else if(room.boxes.isClosed()){ //closed인 경우
		room.boxes.open() //open
	} else {
		// do nothing
	}
}

room.boxes.onOpen = function() {
	room.boxes.setSprite("상자-2-열림.png") //열린 그림으로 변경
	printMessage("아무것도 없다")
}
room.boxes.onClose = function() {
	room.boxes.setSprite("상자-2-닫힘.png") //닫힌 그림으로 변경
}
//<전등>
room.light = room.createObject("light", "천장등.png") 
room.light.setWidth(100)
room.locateObject(room.light, 900, 80)
//<공책>
room.note = room.createObject("note", "노트.png") 
room.note.setWidth(100)
room.locateObject(room.note, 550, 300)
room.note.hide()
//<의자>
room.chair = room.createObject("chair", "의자1-3.png")
room.chair.setWidth(200)
room.locateObject(room.chair, 550, 430)
//<상자, 드라이버 - 전등클릭하기>
room.box2 = room.createObject("box2", "상자4-1-닫힘.png") //상자 생성	
room.head = room.createObject("head", "드라이버비트.png")
room.handle = room.createObject("handle", "드라이버손잡이.png")
room.screwdriver = room.createObject("screwdriver", "드라이버.png")

room.box2.setWidth(200)
room.head.setWidth(50)
room.handle.setWidth(50)
room.screwdriver.hide() // 조합 될 아이템 숨기기
room.head.hide()

room.locateObject(room.box2, 1100, 700)
room.locateObject(room.head, 1100, 700)
room.locateObject(room.handle, 200, 500)

room.box2.onClick = function() { //box2 클릭했을 때
	if(room.box2.isOpened()){ //opened 상태인 경우
		room.box2.close() //close
	} else if(room.box2.isClosed()){ //closed인 경우
		room.box2.open() //open
	} else {
		// do nothing
	}
}

room.box2.onOpen = function() {
	room.box2.setSprite("상자4-1-열림.png") //열린 그림으로 변경
	room.head.show()
}
room.box2.onClose = function() {
	room.box2.setSprite("상자4-1-닫힘.png") //닫힌 그림으로 변경
	room.head.hide() 
}

game.makeCombination(room.head, room.handle, room.screwdriver) // 헤드 + 손잡이 = 드라이버

room.head.onClick = function(){
	room.head.pick()
}
room.handle.onClick = function(){
	room.handle.pick()
}

roomLight = true // 플래그 변수

room.light.onClick = function() {
	if(game.getHandItem() == room.screwdriver) {
		printMessage("나사를 단단히 조여서 작동이 된다")
		if(roomLight) {
			room.setRoomLight(0.1)
			roomLight = false
		} else {
			room.setRoomLight(1)
			roomLight = true
			room.note.show()
			printMessage("무언가 새로운 물체가 눈에 띈다!")
		}
	} else {
		printMessage("나사가 헐거워져있어 작동을 못한다")
	}
}

//<공책 클릭>
room.note.onClick = function(){
	showImageViewer("종이.png", "노트.txt"); // 이미지 출력
}
game.start(room) // 게임시작
printMessage("어느날 눈을 떠보니 이상한 방에 있었다...") // 환영 메시지 출력