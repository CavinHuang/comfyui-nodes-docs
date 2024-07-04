
# Documentation
- Class name: ThemeStylerAdvanced
- Category: ali1234/stylers
- Output node: False

ThemeStylerAdvanced节点根据预定义的主题动态地对文本提示进行主题风格化处理。它通过融入与所选主题相关的风格元素来增强原始文本,旨在修改文本所暗示的语气、情绪或视觉意象。

# Input types
## Required
- text_positive_g
    - 待风格化的全局正面文本提示,代表需要增强的广泛主题内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 待风格化的局部正面文本提示,聚焦于主题内需要强调的具体细节或元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 待风格化的负面文本提示,指示需要避免或与所需风格形成对比的内容或主题。
    - Comfy dtype: STRING
    - Python dtype: str
- theme
    - 用于风格化的选定主题,决定了将应用于文本提示的风格元素。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- negative_prompt_to
    - 指定负面风格化的范围,可以是全局应用、局部应用或两者兼有。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 布尔标志,用于启用或禁用提示转换过程的日志记录,提供对风格化效果的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 风格化后的全局正面文本提示,反映了整体主题。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 风格化后的局部正面文本提示,展示了具体的主题增强效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 合并后的风格化正面文本提示,整合了全局和局部的主题元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 风格化后的全局负面文本提示,指示已避免或形成对比的更广泛内容或主题。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 风格化后的局部负面文本提示,反映了与主题形成对比的具体细节或元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 合并后的风格化负面文本提示,整合了全局和局部与所需主题形成的对比。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
