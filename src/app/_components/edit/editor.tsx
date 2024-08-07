"use client";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import React, { useState, useEffect, type ChangeEvent } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import {
  type IDomEditor,
  type IEditorConfig,
  type IToolbarConfig,
  DomEditor,
} from "@wangeditor/editor";
import Preview from "@/app/_components/writer/preview";
import TagInput from "../../_components/edit/tag";
import { api } from "@/trpc/react";
import {useRouter, useSearchParams} from "next/navigation";
import useLocalStorage from "@/tools/useStore";
import {W100H50Modal} from "@/app/_components/common/W100H50Modal";

function MyEditor() {
  const router = useRouter()
  const createpost = api.post.create.useMutation({
    onSuccess: (r) => {
      console.log(r);
      // setExample(api.post.getAll.useQuery());
    },
  });
  const updatePost = api.post.updatePost.useMutation({
    onSuccess: (r) => {
      console.log(r);
      // setExample(api.post.getAll.useQuery());
    },
  });
  const [token] = useLocalStorage("token",null)
  const params = useSearchParams();
  const columnId = params.get("columnId")
  const postId = params.get("postId")
  let postData;
  if(postId){
    postData = api.post.getByPostId.useQuery({
      id: parseInt(postId),
    }).data
  }
  let draftData;
  if(!postId){
    draftData = api.post.getDraft.useQuery({
      columnId: columnId
    }).data
  }
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  let [html, setHtml] = useState('');
  const draft = html;
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(false);
  const toolbar = DomEditor.getToolbar(editor);
  const [tags, setTags] = useState<string[]>([]);
  const [publishModal,setPublishModal] = useState(false);
  const curToolbarConfig = toolbar?.getConfig();

  // 从 localStorage 中加载保存的草稿数据
  useEffect(() => {
    // 此时是路由过来的数据
    if (postData) {
      setTitle(postData.name);
      setHtml(postData.content);
      setTags(postData.tag.split(","));
      console.log(postData)
    }else if(draftData){
      console.log(draftData)
      setTitle(draftData.name);
      setHtml(draftData.content);
      setTags(draftData.tag.split(","));
    }
  }, [postData, draftData]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.slice(0, 64); // 限制标题长度为64个字符
    setTitle(newTitle);
  };

  const togglePreview = () => {
    setPreview(!preview);
  };
  const Modal = () => {
    return <W100H50Modal>
        <div className={"text-6"}>是否确认要发布</div>
        <div className={"space-x-10 mt-5"}>
          <button
              className="w-22 h-8 shrink-0 bg-[#eea1a1ff] text-[#eb172fff] b-1 b-rd-1 ml-28 mt-1 text-3.5  font-400 lh-5.5 ml-4 mt-1"
              onClick={() => setPublishModal(false)}
          >
            取消
          </button>
          <button
              className="w-22 h-8 shrink-0 bg-[#e8e6a2ff] b-1 b-rd-1 ml-28 mt-1 text-[#595508ff] font-Abel text-3.5 font-not-italic font-400 lh-5.5 ml-4 mt-1"
              onClick={saveDraft}
          >
            保存草稿
          </button>
          <button
              className="w-22 h-8 shrink-0 bg-#DAF9F1 b-1 b-rd-1 ml-28 mt-1 text-[#1DB48D] font-Abel text-3.5 font-not-italic font-400 lh-5.5 ml-4 mt-1"
              onClick={publish}
          >
            确认发布
          </button>
        </div>
    </W100H50Modal>
  }
  // 保存草稿的函数
  const saveDraft = () => {
    // 调用保存草稿的 API 请求，并传递标题、HTML 内容和标签
    // b.mutate({
    //   name: title, // 使用标题作为草稿的名称
    //   content: html, // 使用 HTML 内容作为草稿的内容
    //   tag: tags.join(","), // 将标签列表转换为逗号分隔的字符串
    //   status: false,
    //   columnId: columnId,
    // });
    // 将标题、HTML 内容和标签保存到 localStorage 中
    if (draftData) {
      updatePost.mutate({
        id: draftData.id,
        name: title, // 使用标题作为草稿的名称
        content: html, // 使用 HTML 内容作为草稿的内容
        tag: tags.join(","), // 将标签列表转换为逗号分隔的字符串
        status: false,
        columnId: columnId
      });
    } else {
      createpost.mutate({
        name: title, // 使用标题作为草稿的名称
        content: html, // 使用 HTML 内容作为草稿的内容
        tag: tags.join(","), // 将标签列表转换为逗号分隔的字符串
        status: false,
        columnId: columnId
      });
      router.push(`/writer/content-management?columnId=${columnId}`);
    }
  }
  const publish = () => {
    // 调用保存草稿的 API 请求，并传递标题、HTML 内容和标签
    console.log(html)
    if(postData){
      updatePost.mutate({
        id: postData.id,
        name: title, // 使用标题作为草稿的名称
        content: html, // 使用 HTML 内容作为草稿的内容
        tag: tags.join(","), // 将标签列表转换为逗号分隔的字符串
        status: true,
        columnId: columnId
      });
    }else{
      createpost.mutate({
        name: title, // 使用标题作为草稿的名称
        content: html, // 使用 HTML 内容作为草稿的内容
        tag: tags.join(","), // 将标签列表转换为逗号分隔的字符串
        status: true,
        columnId: columnId
      });
    }
    router.push(`/writer/content-management?columnId=${columnId}`);
  }
  // 发布的函数
  const handleClickPublish = () => {
    setPublishModal(true)
  };

  const toolbarConfig: Partial<IToolbarConfig> = {}; // 工具栏配置
  toolbarConfig.toolbarKeys = [
    // 菜单 key
    "headerSelect",

    // 分割线
    "|",

    // 菜单 key
    "undo",
    "redo",
    "fontFamily",
    {
      key: "group-justify",
      title: "对齐",
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
      menuKeys: [
        "justifyLeft",
        "justifyRight",
        "justifyCenter",
        "justifyJustify",
      ],
    },
    "color",
    "bold",
    "underline",
    "italic",
    "through",
    "code",
    "clearStyle",
    "bulletedList",
    "numberedList",
    "insertLink",
    {
      key: "group-image",
      title: "图片",
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
      menuKeys: ["insertImage", "uploadImage"],
    },
    "codeBlock",
    "blockquote",
    "divider",

    // 菜单组，包含多个菜单

    // 继续配置其他菜单...
  ];
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
    maxLength: 1000,
    MENU_CONF: {},
  }; // 编辑器配置

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);


  console.log(html)
//   // 上传图片的配置
//   const E = window.wangEditor
//   const editor_1 = new E('#div1')
//
// // 配置 server 接口地址
//   editor_1.config.uploadImgServer = '/upload-img'
//
//   editor_1.create()
//
//   editorConfig.MENU_CONF['uploadImage'] = {
//     server: 'http://106.12.198.214:3000/api/upload-img', // 上传图片地址
//     // server: 'http://106.12.198.214:3000/api/upload-img-10s', // 用于测试 timeout
//     // server: 'http://106.12.198.214:3000/api/upload-img-failed', // 用于测试 failed
//     // server: 'http://106.12.198.214:3000/api/xxx', // 用于测试 404
//
//     timeout: 5 * 1000, // 5s
//
//     fieldName: 'custom-fileName',
//     meta: { token: 'xxx', a: 100 },
//     metaWithUrl: true, // 参数拼接到 url 上
//     headers: { Accept: 'text/x-json' },
//
//     maxFileSize: 10 * 1024 * 1024, // 10M
//
//     base64LimitSize: 5 * 1024, // 5kb 以下插入 base64
//
//     onBeforeUpload(files) {
//       console.log('onBeforeUpload', files)
//
//       return files // 返回哪些文件可以上传
//       // return false 会阻止上传
//     },
//     onProgress(progress) {
//       console.log('onProgress', progress)
//     },
//     onSuccess(file, res) {
//       console.log('onSuccess', file, res)
//     },
//     onFailed(file, res) {
//       alert(res.message)
//       console.log('onFailed', file, res)
//     },
//     onError(file, err, res) {
//       alert(err.message)
//       console.error('onError', file, err, res)
//     },
//
//     // // 用户自定义插入图片
//     // customInsert(res, insertFn) {
//     //   console.log('customInsert', res)
//     //   const imgInfo = res.data[0] || {}
//     //   const { url, alt, href } = imgInfo
//     //   if (!url) throw new Error(`Image url is empty`)
//
//     //   // 自己插入图片
//     //   console.log('自己插入图片', url)
//     //   insertFn(url, alt, href)
//     // },
//
//     // // 用户自定义上传图片
//     // customUpload(file, insertFn) {
//     //   console.log('customUpload', file)
//
//     //   return new Promise((resolve) => {
//     //     // 插入一张图片，模拟异步
//     //     setTimeout(() => {
//     //       const src = `https://www.baidu.com/img/flexible/logo/pc/result@2.png?r=${Math.random()}`
//     //       insertFn(src, '百度 logo', src)
//     //       resolve('ok')
//     //     }, 500)
//     //   })
//     // },
//
//     // // 自定义选择图片（如图床）
//     // customBrowseAndUpload(insertFn) {
//     //   alert('自定义选择图片，如弹出图床')
//
//     //   // 插入一张图片，模拟异步
//     //   setTimeout(() => {
//     //     const src = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
//     //     insertFn(src, '百度 logo', src) // 插入图片
//     //   }, 500)
//     // },
//   }

  return (
    <div className="pt-21.5">
      <div className="w-360 h-197.824 shrink-0 border-rd-[0px_0px_10px_10px] bg-[#FFF] m-auto">
        <div
          style={{ zIndex: 100 }}
          className="w-340.36225 h-180 shrink-0 m-auto"
        >
          <div className="flex pt-6.375">
            {/* 工具栏 */}
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ border: "1px solid #ccc" }}
            />
            <div className="flex">
              <TagInput tags={tags} setTags={setTags} />
              <div className="w-22 h-8 shrink-0 bg-#DAF9F1 b-1 b-rd-1 ml-28 mt-1">
                <button
                  className="text-[#1DB48D] font-Abel text-3.5 font-not-italic font-400 lh-5.5 ml-4 mt-1"
                  onClick={saveDraft}
                >
                  保存草稿
                </button>
              </div>
              <div
                className={`b-1 b-rd-1 w-22 h-8 shrink-0 fill-#FFF flex items-center justify-center stroke-0.25 stroke-[#D9D9D9]  mt-1 ml-1.5 ${
                  preview ? "bg-#1db48d" : ""
                }`}
              >
                <button
                  className={`${
                    preview ? "text-#ffffff" : "text-[rgba(0,0,0,0.65)]"
                  } text-3.5 font-not-italic font-400 `}
                  onClick={togglePreview}
                >
                  {preview ? "取消预览" : "预览"}
                </button>
              </div>
              <div className="b-1 b-rd-1 w-16.25 h-8 shrink-0 fill-#FFF stroke-0.25 stroke-[#D9D9D9] mt-1 ml-1.5">
                <button
                  className="text-[rgba(0,0,0,0.65)] font-Abel text-3.5 font-not-italic font-400 lh-5.5 ml-4 mt-1"
                  onClick={handleClickPublish}
                >
                  发布
                </button>
              </div>
            </div>
          </div>

          <div className="flex relative w-340.36225 h-154.18775 shrink-0 fill-#FFF stroke-0.25 stroke-[#D9D9D9] mt-16.625">
            <div className="relative">
              {preview ? (
                <div
                  className={"relative w-243.3755 mr-10 b-1 b-solid b-#ccc "}
                >
                  {/* 标题输入框 */}
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="在这里输入标题"
                    maxLength={64}
                    className="outline-none  mt-7.5 pl-10"
                    v-mode="title"
                  />
                  {/* 富文本编辑器 */}
                  <Editor
                    defaultConfig={editorConfig}
                    onCreated={setEditor}
                    onChange={(editor) => setHtml(editor.getHtml())}
                    mode="default"
                    value={draft}
                    style={{ height: "500px", overflowY: "hidden" }}
                    className="  shrink-0 fill-#FFF stroke-0.25 stroke-[#D9D9D9] mt-5 p-l-10"
                  />
                </div>
              ) : (
                <div className={"relative w-335 b-1 b-solid b-#ccc "}>
                  {/* 标题输入框 */}
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="在这里输入标题"
                    maxLength={64}
                    className="outline-none  mt-7.5 pl-10"
                  />
                  {/* 富文本编辑器 */}
                  <Editor
                    defaultConfig={editorConfig}
                    onCreated={setEditor}
                    onChange={(editor) => setHtml(editor.getHtml())}
                    mode="default"
                    value={draft}
                    style={{ height: "500px", overflowY: "hidden" }}
                    className="  shrink-0 fill-#FFF stroke-0.25 stroke-[#D9D9D9] mt-5 p-l-10"
                  />
                </div>
              )}
              {preview && (
                <div className="absolute top-0 right--89 h-full w-93 bg-white">
                  <Preview html={html} title={title} tags={tags} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {
        publishModal && (<Modal></Modal>)
      }
    </div>
  );
}

export default MyEditor;
