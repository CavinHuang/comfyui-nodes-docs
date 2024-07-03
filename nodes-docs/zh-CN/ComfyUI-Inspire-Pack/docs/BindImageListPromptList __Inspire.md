
# Documentation
- Class name: BindImageListPromptList __Inspire
- Category: InspirePack/Prompt
- Output node: False

BindImageListPromptList节点旨在将图像列表与相应的提示词列表整合在一起，从而创建丰富的视觉-文本数据集。该节点简化了图像与其对应提示词的绑定过程，使视觉和文本数据的处理更加高效和有组织，可用于创意或分析目的。

# Input types
## Required
- images
    - images参数接受一个待绑定提示词的图像列表，作为数据集的视觉组件。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- zipped_prompts
    - zipped_prompts参数接受一个与图像相关联的提示词列表（压缩格式），作为数据集的文本组件。
    - Comfy dtype: ZIPPED_PROMPT
    - Python dtype: List[Tuple[str, str, str]]
- default_positive
    - default_positive参数指定了一个默认的正面提示词，当提示词数量少于图像数量时使用。
    - Comfy dtype: STRING
    - Python dtype: str
- default_negative
    - default_negative参数指定了一个默认的负面提示词，使用情况与默认正面提示词类似，确保所有图像都有对应的提示词。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 返回原始图像列表，保持视觉数据的完整性。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- positive
    - 返回正面提示词列表，每个提示词对应一张图像，用正面文本注释丰富数据集。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- negative
    - 返回负面提示词列表，补充正面提示词，为每张图像提供对比性的文本注释。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- prompt_label
    - 返回提示词的标签列表，为绑定的图像-提示词对提供额外的上下文或分类信息。
    - Comfy dtype: STRING
    - Python dtype: List[str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BindImageListPromptList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "zipped_prompts": ("ZIPPED_PROMPT",),
                "default_positive": ("STRING", {"multiline": True, "placeholder": "default positive"}),
                "default_negative": ("STRING", {"multiline": True, "placeholder": "default negative"}),
            }
        }

    INPUT_IS_LIST = True

    RETURN_TYPES = ("IMAGE", "STRING", "STRING", "STRING")
    RETURN_NAMES = ("image", "positive", "negative", "prompt_label")

    OUTPUT_IS_LIST = (True, True, True,)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    def doit(self, images, zipped_prompts, default_positive, default_negative):
        positives = []
        negatives = []
        prompt_labels = []

        if len(images) < len(zipped_prompts):
            zipped_prompts = zipped_prompts[:len(images)]

        elif len(images) > len(zipped_prompts):
            lack = len(images) - len(zipped_prompts)
            default_prompt = (default_positive[0], default_negative[0], "default")
            zipped_prompts = zipped_prompts[:]
            for i in range(lack):
                zipped_prompts.append(default_prompt)

        for prompt in zipped_prompts:
            a, b, c = prompt
            positives.append(a)
            negatives.append(b)
            prompt_labels.append(c)

        return (images, positives, negatives, prompt_labels)

```
