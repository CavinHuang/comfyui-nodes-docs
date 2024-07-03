
# Documentation
- Class name: FocalPointStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/ali1234/comfyui-stylers

FocalPointStyler节点根据选定的风格元素动态定制文本提示，允许增强或改变生成内容中的焦点。它利用一系列预定义模板来应用风格修改，旨在细化输入文本的焦点和主题强调。

# Input types
## Required
- text_positive
    - 要进行风格化的文本的正面内容，作为风格增强的主要内容。它在确定输出的整体主题方向和焦点方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行风格化的文本的负面内容，用于平衡或提供与正面文本的对比。这个输入有助于微调风格化输出的主题焦点和深度。
    - Comfy dtype: STRING
    - Python dtype: str
- focal point
    - 这个参数的具体功能和类型未知，但可能与设置或选择文本中的焦点有关。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- log_prompt
    - 这个参数的具体功能和类型未知，但可能与记录或输出提示信息有关。
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown

# Output types
- text_positive
    - 根据选定的风格元素增强后的正面文本版本。它反映了应用的修改，展示了节点细化和聚焦主题内容的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 增强后的负面文本版本，其风格旨在补充正面文本的主题焦点。它展示了节点通过风格变化平衡和丰富整体内容的能力。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
