
# Documentation
- Class name: DepthStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DepthStylerAdvanced节点是一个用于高级文本提示样式设计的工具，它允许通过多种样式选项进行自定义。该节点支持对提示的正面和负面方面进行修改，可以进行详细的调整，以增强生成内容的整体效果和有效性。

# Input types
## Required
- text_positive_g
    - 代表文本提示的全局正面方面，侧重于要在生成内容中强调的广泛、总体的正面主题或元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 捕捉文本提示的局部正面方面，详细说明要突出的具体正面元素或细节。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 此输入捕捉用户希望在生成内容中最小化或避免的负面方面或元素，确保样式调整能够抵消这些不希望出现的特征。
    - Comfy dtype: STRING
    - Python dtype: str
- depth
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负面提示调整的范围，允许用户针对全局、局部或两者进行负面样式设计。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，当启用时，会记录原始和样式化的提示，以及用户对每个菜单的选择，提供了解样式选择如何影响最终输出的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - Comfy dtype: STRING
    - 经过增强的全局正面文本提示，经过样式化处理以更有效地强调总体正面主题。
    - Python dtype: str
- text_positive_l
    - Comfy dtype: STRING
    - 经过增强的局部正面文本提示，经过样式化处理以更有效地突出具体正面细节。
    - Python dtype: str
- text_positive
    - Comfy dtype: STRING
    - 文本提示的全局和局部正面方面的组合，经过样式化处理以更有效地强调广泛主题和具体细节。
    - Python dtype: str
- text_negative_g
    - Comfy dtype: STRING
    - 调整后的全局负面文本提示，经过修改以进一步抑制或否定不希望出现的总体负面元素。
    - Python dtype: str
- text_negative_l
    - Comfy dtype: STRING
    - 调整后的局部负面文本提示，经过修改以进一步抑制或否定不希望出现的具体负面细节。
    - Python dtype: str
- text_negative
    - Comfy dtype: STRING
    - 文本提示的全局和局部负面方面的组合，经过调整以更有效地抑制或否定广泛主题和具体细节。
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
