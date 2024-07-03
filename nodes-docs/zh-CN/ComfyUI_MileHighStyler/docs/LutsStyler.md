
# Documentation
- Class name: LutsStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LutsStyler节点根据预定义的LUTs（Look-Up Tables）集合中选择的项目，动态地对文本提示应用风格化转换。它允许通过各种风格滤镜来定制文本提示，从而增强其主题和美学特质。

# Input types
## Required
- text_positive
    - 需要进行风格化处理的正面文本提示。它作为基础内容，将根据所选的LUT风格进行转换，影响整体基调和主题。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要进行风格化处理的负面文本提示。这个输入与正面提示配合使用，通过对所选LUT的应用来微调文本的风格，以减弱或否定某些方面。
    - Comfy dtype: STRING
    - Python dtype: str
- LUTs
    - 应用于文本提示的特定Look-Up Table（LUT）选择。这个输入决定了用于转换文本的风格滤镜，直接影响最终的美学和主题输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list[str]
- log_prompt
    - 控制提示转换日志记录的布尔标志。启用时，它通过输出原始和转换后的提示来提供风格化过程的可视性，有助于调试和优化。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 根据所选LUT进行风格化处理后的转换正面文本提示。它反映了所做的风格调整，展示了增强的主题和美学特质。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 使用所选LUT进行风格化处理后的转换负面文本提示。这个输出突出了对文本风格所做的细微调整，补充了正面提示的转换。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
