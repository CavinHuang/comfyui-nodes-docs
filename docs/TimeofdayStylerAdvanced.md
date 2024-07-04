
# Documentation
- Class name: TimeofdayStylerAdvanced
- Category: ali1234/stylers
- Output node: False

TimeofdayStylerAdvanced节点旨在通过可定制的模板和选项对文本提示进行高级样式设置。它根据用户定义的样式和偏好动态调整文本提示，从而能够创建出细致入微且与上下文相关的文本输出。

# Input types
## Required
- text_positive_g
    - 要进行样式设置的全局正面文本提示，代表将根据所选样式选项进行修改的广泛主题输入。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行样式设置的局部正面文本提示，代表更具体或详细的主题输入，将根据所选样式选项与全局提示一起进行修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式设置的负面文本提示，作为与正面提示形成对比的输入，将根据所选样式选项进行修改。
    - Comfy dtype: STRING
    - Python dtype: str
- timeofday
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负面样式应用的范围，确定是影响全局提示、局部提示还是两者兼顾。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 用于启用输入和输出提示的日志记录的标志，用于调试或分析目的，提供有关如何应用样式调整的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 经过样式设置的全局正面文本提示，反映了所选样式选项的修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 经过样式设置的局部正面文本提示，反映了所选样式选项的修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 结合了全局和局部修改的综合样式化正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 经过样式设置的全局负面文本提示，反映了为负面提示选择的样式选项的修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 经过样式设置的局部负面文本提示，反映了为负面提示选择的样式选项的修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 结合了全局和局部修改的综合样式化负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
