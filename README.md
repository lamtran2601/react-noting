<br />
<div align="center">
  <h1 align="center">Noting</h1>
  <p align="center">
    Simple notion alternative with markdown format
    <br />
    <a href="http://react-noting.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/lamtran2601/react-noting/issues">Report Bug - Request Feature</a>
  </p>
</div>

[![Product Name Screen Shot][product-screenshot]](http://react-noting.vercel.app)

## Features
- [x] Public, Private mode
- [x] Realtime Syncing
- [x] Desktop & Mobile Responsive
- [ ] Pin note
- [ ] Note template
- [ ] Document Collaboration
- [ ] Export markdown file

## Built With

* [React.js](https://reactjs.org/)
* [Redux Toolkit](https://github.com/reduxjs/redux-toolkit)
* [Ant Design](https://github.com/ant-design/ant-design/)
* [rich-markdown-editor](https://github.com/outline/rich-markdown-editor)
* [Supabase](https://github.com/supabase/supabase)

## Getting Started

1. [Setup Supabase](./Supabase.md#setup)

    Install Supabase CLI
    ```
    brew install supabase/tap/supabase
    ```
    Start local server
    ```
    supabase start
    ```

2. Clone the repo
    ```sh
    git clone https://github.com/lamtran2601/react-noting.git
    ```

3. Enter your API in `.env`
    ```env
    REACT_APP_SUPABASE_URL='YOUR-SUPABASE-URL'
    REACT_APP_SUPABASE_ANON_KEY='YOUR-ANON-KEY'
    ```

4. Run Frontend app in local
    ```sh
    yarn
    ```
    ```sh
    yarn start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/screenshot.png
