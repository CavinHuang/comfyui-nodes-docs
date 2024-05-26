# Documentation
- Class name: BindImageListPromptList
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在处理和组织图像数据及其对应的文本提示，确保每张图像都与正面和负面的文本响应相关联。它通过调整提示以匹配图像数量来管理输入数据长度的差异，从而为图像-文本配对任务提供流畅的工作流程。

# Input types
## Required
- images
    - 图像参数是节点操作的基础，非常关键。它是一组将与文本提示配对的图像数据，影响节点的执行和输出质量。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
- zipped_prompts
    - 该参数保存了一个元组列表，每个元组包含一对正面和负面的文本提示。这对节点的功能至关重要，因为它直接影响每张图像产生的文本关联。
    - Comfy dtype: ZIPPED_PROMPT
    - Python dtype: List[Tuple[str, str, str]]
- default_positive
    - 默认正面文本用于填充图像多于提示的情况。它确保每张图像都有一个对应的正面提示，保持节点输出的一致性。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- default_negative
    - 与默认正面文本类似，此参数为没有对应提示的图像提供默认负面文本。它有助于节点生成完整的图像-文本对。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Output types
- image
    - 输出图像是节点处理的直接结果，保留了原始图像数据，但现在与相关的文本提示配对。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
- positive
    - 此输出包含与每张图像相关的正面文本提示，可用于进一步分析或作为更大的图像-文本数据集的一部分。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- negative
    - 负面文本提示与正面的一起输出，为每张图像提供对比，并增强了图像-文本配对的全面性。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- prompt_label
    - 这个输出标签指示与每张图像相关的提示类型，无论是默认的还是特别提供的，有助于图像-文本对的组织和分类。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class BindImageListPromptList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'zipped_prompts': ('ZIPPED_PROMPT',), 'default_positive': ('STRING', {'multiline': True, 'placeholder': 'default positive'}), 'default_negative': ('STRING', {'multiline': True, 'placeholder': 'default negative'})}}
    INPUT_IS_LIST = True
    RETURN_TYPES = ('IMAGE', 'STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('image', 'positive', 'negative', 'prompt_label')
    OUTPUT_IS_LIST = (True, True, True)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Prompt'

    def doit(self, images, zipped_prompts, default_positive, default_negative):
        positives = []
        negatives = []
        prompt_labels = []
        if len(images) < len(zipped_prompts):
            zipped_prompts = zipped_prompts[:len(images)]
        elif len(images) > len(zipped_prompts):
            lack = len(images) - len(zipped_prompts)
            default_prompt = (default_positive[0], default_negative[0], 'default')
            zipped_prompts = zipped_prompts[:]
            for i in range(lack):
                zipped_prompts.append(default_prompt)
        for prompt in zipped_prompts:
            (a, b, c) = prompt
            positives.append(a)
            negatives.append(b)
            prompt_labels.append(c)
        return (images, positives, negatives, prompt_labels)
```