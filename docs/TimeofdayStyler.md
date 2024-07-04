
# Documentation
- Class name: TimeofdayStyler
- Category: ali1234/stylers
- Output node: False

TimeofdayStyler节点根据一天中不同时段的风格偏好动态定制文本提示，利用一系列预定义的模板来增强或修改提示中的描述性元素。该节点旨在为文本生成任务提供细致入微且与上下文相关的调整，特别关注与一天中不同时段相关的氛围和光线条件。

# Input types
## Required
- text_positive
    - 需要进行风格化的正面文本提示，作为特定时段增强的基础内容。这一输入对于调整输出以反映所需的氛围条件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要进行风格化的负面文本提示，用于在生成过程中否定或平衡特定元素。这一输入有助于通过排除不需要的时段特征来优化输出。
    - Comfy dtype: STRING
    - Python dtype: str
- timeofday
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- log_prompt
    - 未知
    - Comfy dtype: BOOLEAN
    - Python dtype: unknown

# Output types
- text_positive
    - 经过增强的正面文本提示，加入了特定时段的特征，以更好地反映所需的氛围和光线条件。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 经过优化的负面文本提示，经过风格化以排除或否定不需要的时段元素，确保更加集中和相关的文本生成输出。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
