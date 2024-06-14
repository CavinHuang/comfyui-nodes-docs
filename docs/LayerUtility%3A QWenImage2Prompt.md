# Documentation
- Class name: QWenImage2Prompt
- Category: 😺dzNodes/LayerUtility/Prompt
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

根据图片反推提示词。这个节点是[ComfyUI_VLM_nodes](https://github.com/gokayfem/ComfyUI_VLM_nodes)中的UForm-Gen2 Qwen Node节点的重新封装，感谢原作者。 请从[huggingface](https://huggingface.co/unum-cloud/uform-gen2-qwen-500m)或者[百度网盘](https://pan.baidu.com/s/1ztnVX_Sh800xsWZhMDe-Ww?pwd=esyt)下载模型到ComfyUI/models/LLavacheckpoints/files_for_uform_gen2_qwen文件夹。

# Input types

## Required

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- question
    - 对UForm-Gen-QWen模型的提示词。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types

- text
    - 文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```python
class QWenImage2Prompt:
    def __init__(self):
        self.chat_model = UformGen2QwenChat()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "question": ("STRING", {"multiline": False, "default": "describe this image",},),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "uform_gen2_qwen_chat"
    CATEGORY = '😺dzNodes/LayerUtility/Prompt'

    def uform_gen2_qwen_chat(self, image, question):
        history = []  # Example empty history
        pil_image = ToPILImage()(image[0].permute(2, 0, 1))
        temp_path = files_for_uform_gen2_qwen / "temp.png"
        pil_image.save(temp_path)

        response = self.chat_model.chat_response(question, history, temp_path)
        return (response.split("assistant\n", 1)[1], )
```