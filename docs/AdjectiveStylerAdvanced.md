
# Documentation
- Class name: AdjectiveStylerAdvanced
- Category: ali1234/stylers
- Output node: False

AdjectiveStylerAdvanced节点根据用户选择的形容词动态地对文本输入进行风格转换，从而增强或改变文本的语气、情绪或描述质量。它利用一系列预定义的模板根据用户选择的风格偏好修改文本输入，旨在实现特定的美学或主题效果。

# Input types
## Required
- text_positive_g
    - 要进行风格化处理的全局正面文本，影响输入的整体正面语气或内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行风格化处理的局部正面文本，针对输入中的特定正面方面或细节。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行风格化处理的负面文本，专注于改变或增强输入中的负面元素或语气。
    - Comfy dtype: STRING
    - Python dtype: str
- adjective
    - unknown
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 确定负面文本转换的范围，允许自定义要进行风格化处理的文本部分（全局、局部或两者）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- log_prompt
    - 一个布尔标志，用于启用或禁用提示风格化过程的日志记录，提供对所应用的选择和转换的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 经过风格化处理的全局正面文本，反映了应用的风格转换。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 经过风格化处理的局部正面文本，展示了所做的具体风格增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 风格化正面文本的组合，结合全局和局部转换以产生连贯的效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 经过风格化处理的全局负面文本，表明应用于整体负面语气或内容的风格变化。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 经过风格化处理的局部负面文本，突出显示对特定负面细节或方面所做的风格改变。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 完全风格化的负面文本，包含全局和局部风格转换。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
