
# Documentation
- Class name: LLMLLaVANextImageEvaluator
- Category: SALT/Language Toolkit/Tools
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMLLaVANextImageEvaluator节点专门用于使用LLaVA Next V1模型评估图像，基于提供的提示和图像生成描述或标题。它简化了图像处理和模型评估的复杂性，为生成图像的文本表示提供了一个精简的接口。

# Input types
## Required
- lnv1_model
    - 用于评估图像的LLaVA Next V1模型。它对执行至关重要，因为它直接影响生成的标题的质量和相关性。
    - Comfy dtype: LLAVA_NEXT_V1_MODEL
    - Python dtype: LlavaNextV1
- images
    - 表示为张量的一批图像。这些图像是评估和标题生成的主要对象，作为模型的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- max_tokens
    - 指定为每个图像描述生成的最大令牌数。此参数控制输出标题的详细程度和细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- prompt_format
    - 用于构建模型提示的格式，将图像和用户指令整合到结构化模板中。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - 给予模型生成图像描述的具体提示或指令，影响生成文本的上下文和焦点。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- strings
    - 生成的图像描述的原始字符串。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- list
    - 原始字符串的列表，每个字符串代表输入图像的生成描述。
    - Comfy dtype: LIST
    - Python dtype: List[str]
- documents
    - Document对象的集合，每个对象封装了生成的图像描述以及额外的元数据，如用户提示和图像缩略图。
    - Comfy dtype: DOCUMENT
    - Python dtype: List[Document]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMLLaVANextImageEvaluator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "lnv1_model": ("LLAVA_NEXT_V1_MODEL",),
                "images": ("IMAGE",),
                "max_tokens": ("INT", {"min": 0, "max": 2048, "default": 48}),
                "prompt_format": ("STRING", {"multiline": True, "dynamicPrompt": False, "default": "[INST] SYSTEM: You are a professional image captioner, follow the directions of the user exactly.\nUSER: <image>\n<prompt>[/INST]"}),
                "prompt": ("STRING", {"multiline": True, "dynamicPrompt": False, "default": "Describe the image in search engine keyword tags"}),
            }
        }

    RETURN_TYPES = ("STRING", "LIST", "DOCUMENT")
    RETURN_NAMES = ("strings", "list", "documents")
    OUTPUT_IS_LIST =(True, False)

    FUNCTION = "eval"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools"

    def eval(
        self, 
        lnv1_model: LlavaNextV1,
        images: torch.Tensor,  
        max_tokens: int = 48, 
        prompt_format: str = "[INST] SYSTEM: You are a professional image captioner, follow the directions of the user exactly.\nUSER: <image>\n<prompt>[/INST]",
        prompt: str = "Describe the image in search engine keyword tags"
    ):
        results = []
        for image in images:
            pil_image = tensor2pil(image)
            results.append(lnv1_model.eval(pil_image, prompt, prompt_format, max_tokens=max_tokens))
        documents = [Document(text=result, extra_info={"user_prompt": prompt, "thumbnail": self.b64_thumb(pil_image, (128, 64))}) for result in results]
        return (results, results, documents)

    def b64_thumb(self, image, max_size=(128, 128)):
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG")
        base64_string = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return base64_string

```
