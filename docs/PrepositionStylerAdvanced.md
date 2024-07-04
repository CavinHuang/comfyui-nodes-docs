
# Documentation
- Class name: PrepositionStylerAdvanced
- Category: ali1234/stylers
- Output node: False

PrepositionStylerAdvanced节点为文本输入提供高级样式设置功能，利用各种样式模板根据用户选择的选项修改和增强文本。它旨在通过复杂的样式转换来提高文本的表现力和主题深度。

# Input types
## Required
- text_positive_g
    - 要进行样式设置的全局正面文本输入，作为样式增强的基础元素之一。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行样式设置的局部正面文本输入，为全局正面文本提供额外的细节和细微差别，以获得更精细的样式效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式设置的负面文本输入，为正面文本输入提供对比，允许进行平衡和细致的文本转换。
    - Comfy dtype: STRING
    - Python dtype: str
- preposition
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 控制应用负面样式的范围，可以是全局、局部或同时应用于两者，进一步定制样式设置过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，用于启用输入和输出文本以及所选菜单选项的日志记录，有助于调试和过程透明度。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 根据所选样式模板和输入转换后的全局正面文本输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 与全局正面文本结合提供详细样式增强的局部正面文本输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 合并全局和局部增强的综合样式转换后的正面文本输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 为正面文本输出提供样式对比的全局负面文本输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 为全局负面样式添加深度和细微差别的局部负面文本输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 包含全局和局部负面样式修改的合并负面文本输出。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
