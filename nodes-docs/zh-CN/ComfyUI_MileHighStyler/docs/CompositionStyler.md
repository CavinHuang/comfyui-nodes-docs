
# Documentation
- Class name: CompositionStyler
- Category: ali1234/stylers
- Output node: False

CompositionStyler节点根据选定的构图相关样式动态地对文本提示进行样式处理。它利用预定义的模板集来修改和增强输入的文本提示，旨在实现特定的构图美学或效果。

# Input types
## Required
- text_positive
    - 需要进行样式处理的文本提示的正面方面。它在决定样式化输出的整体基调和方向上起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要进行样式处理的文本提示的负面方面。它用于与正面提示的某些元素形成对比或否定，有助于产生更加微妙和平衡的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- composition
    - 指定要应用于文本提示的构图相关样式。这个选择影响样式处理过程，使输出能够达到预期的构图效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，用于指示是否应记录提示样式处理过程。这有助于调试和理解所选样式是如何被应用的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 正面文本提示的样式化版本，反映了所应用的构图样式。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本提示的样式化版本，展示了所应用样式在对比或否定方面的效果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
