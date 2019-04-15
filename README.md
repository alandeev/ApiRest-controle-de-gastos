# ApiRest Node-Express / Mongoose

Estava estudando node->express com banco de dados mongoose, e token jwt, resolvi criar algo que necessito para controlar os meus gastos.

<div class='tutorial'>
  <div class='title'>
    <h2>tutorial</h2>
  </div>
  <div class='items'>
    <ul>
      <li><strong>First</strong>: Install mongodb</li>
      <li><strong>Second</strong>: Configure database for your config</li>
      <li><strong>Third</strong>: Install all dependencies</li>
      <li><strong>Room</strong>: Execute app.js in source "src"</li>
    </ul>
  </div>
</div>

<div class='title_main'>
  <div class='title'>
    <h2>dependencies</h2>
  </div>
  <div class='items'>
    <ul>
      <li>express</li>
      <li>consign</li>
      <li>body-parser</li>
      <li>jsonwebtoken</li>
      <li>mongoose and install mongodb</li>
    </ul>
  </div>
</div>

<div class='routers'>
  <div class='title'>
    <h2>All Routers</h2>
  </div>
  <div class='items'>
    <div class='item-router'>
      <h3>/api</h3>
      <ul>
        <li>
        <p><strong>/auth</strong> - received 2 parameter in json ['<strong>username</strong>']</p>
        </li>
        <li>
        <p><strong>/register</strong> - received 3 parameter in json ['<strong>fullname</strong>', '<strong>username</strong>']</p>
        </li>
      </ul>
    </div>
    <div class='item-router'>
      <h3>/api/user</h3>
      <ul>
        <li>
        <p><strong>/getinfo</strong> - GET REQUEST return all <strong>info</strong> and <strong>posts</strong> of the user connected</p>
        </li>
      </ul>
    </div>
    <div class='item-router'>
      <h3>/api/post</h3>
      <ul>
        <li>
          <p><strong>/add</strong> - received 4 parameter in json ['<strong>title</strong>', '<strong>description</strong>', '<strong>value</strong>', '<strong>mode</strong>']</p>
        </li>
        <li>
          <p><strong>/getall</strong> - GET REQUEST, return all <strong>posts</strong> of the user connected</p>
        </li>
        <li>
          <p><strong>/getone</strong>  - received 1 parameter in json ['<strong>post</strong>']</p>
        </li>
        <li>
          <p><strong>/remove</strong>  - received 1 parameter in json ['<strong>post</strong>']</p>
        </li>
      </ul>
    </div>
  </div>
</div>
