# Snake Game

这是一个经典的贪吃蛇游戏，使用 HTML、CSS 和 JavaScript 实现。玩家通过控制蛇的移动来吃掉食物，每吃掉一个食物，蛇的长度会增加，同时得分也会增加。游戏结束的条件是蛇撞到墙壁或自己的身体。

## 如何运行游戏

### 1. 下载文件
首先，将以下三个文件下载到你的本地计算机：
- `index.html`
- `script.js`
- `styles.css`

确保这三个文件位于同一个文件夹中。

### 2. 打开游戏
1. 打开 `index.html` 文件。你可以通过双击文件或在浏览器中拖放文件来打开它。
2. 游戏界面将会显示在浏览器中。

### 3. 开始游戏
1. 点击 "Start Game" 按钮，游戏将开始。
2. 使用键盘上的方向键来控制蛇的移动：
   - **上箭头 (↑)**：向上移动
   - **下箭头 (↓)**：向下移动
   - **左箭头 (←)**：向左移动
   - **右箭头 (→)**：向右移动

### 4. 游戏规则
- 每吃掉一个食物，蛇的长度会增加，同时得分会增加 10 分。
- 如果蛇撞到墙壁或自己的身体，游戏结束。
- 游戏结束后，会弹出一个提示框显示 "Game Over!"，你可以点击 "Start Game" 按钮重新开始游戏。

## 文件说明

### `index.html`
- 这是游戏的主页面文件，包含了游戏的基本结构和 Canvas 元素。

### `script.js`
- 这是游戏的核心逻辑文件，包含了蛇的移动、食物的生成、碰撞检测等功能。

### `styles.css`
- 这是游戏的样式文件，定义了游戏界面的外观和布局。

## 自定义游戏

如果你想要自定义游戏，可以修改以下部分：

### 修改游戏速度
在 `script.js` 文件中，找到以下代码：
```javascript
gameInterval = setInterval(draw, 100);
```
将 100 改为其他数值（单位是毫秒），数值越小，游戏速度越快。

## 自定义游戏

如果你想要自定义游戏，可以修改以下部分：

### 修改游戏区域大小
在 `index.html` 文件中，找到以下代码：
```html
<canvas id="gameCanvas" width="400" height="400"></canvas>
```
你可以修改 width 和 height 的值来调整游戏区域的大小。例如：

将 width="400" height="400" 改为 width="600" height="600"，游戏区域会变大。

将 width="400" height="400" 改为 width="300" height="300"，游戏区域会变小。

注意：修改游戏区域大小后，可能需要调整 script.js 中的 box 变量（表示每个格子的大小）以确保蛇和食物的显示正常。

### 修改游戏速度
在 script.js 文件中，找到以下代码：

```javascript
gameInterval = setInterval(draw, 100);
```

将 100 改为其他数值（单位是毫秒），数值越小，游戏速度越快。

### 修改蛇和食物的颜色
在 script.js 文件中，找到以下代码：

```javascript
ctx.fillStyle = 'red'; // 食物的颜色
ctx.fillStyle = index === 0 ? 'green' : 'white'; // 蛇的颜色
```
你可以修改 fillStyle 的值来改变蛇和食物的颜色。例如：

将 'red' 改为 'blue'，食物会变成蓝色。

将 'green' 改为 'yellow'，蛇头会变成黄色。

将 'white' 改为 'gray'，蛇身会变成灰色。
