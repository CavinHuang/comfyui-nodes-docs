
# Documentation
- Class name: MaterialsStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

MaterialsStyler节点可根据选定的材料主题模板动态地为文本提示词应用样式。它允许用户通过融入特定材料的风格来增强或修改其提示词的美学和主题方面，旨在实现更具针对性和精致的输出效果。

# Input types
## Required
- text_positive
    - 需要设置样式的文本提示词的正面部分。它在决定样式化输出的整体积极基调和主题方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要设置样式的文本提示词的负面部分。它对于定义样式化输出中需要淡化或避免的元素至关重要，有助于产生更加细致入微的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- materials
    - 指定要应用于文本提示词的材料主题模板。这一选择对于定制样式化过程至关重要，直接影响着美学和主题上的最终效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，用于指示是否记录提示词样式化过程。启用此选项可提供对样式化决策的透明度和洞察力。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 反映了已应用材料主题样式的文本提示词的正面部分。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 展示了为淡化或避免某些元素而进行调整后的文本提示词的负面部分。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
