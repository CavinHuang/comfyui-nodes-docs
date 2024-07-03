
# Documentation
- Class name: Clothing_StateStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Clothing_StateStylerAdvanced节点是SDXLPromptStylerAdvanced的动态子类，为与服装状态相关的文本提示提供高级样式设置功能。它利用预定义的模板集来修改和增强输入的文本提示，基于用户选择的样式选项，旨在优化生成的文本描述或命令，特别是在服装外观或状态的上下文中。

# Input types
## Required
- text_positive_g
    - 要进行样式设置的文本提示的全局正面方面，侧重于更广泛、可取的属性或结果。它对于定义样式化提示的整体正面主题至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行样式设置的文本提示的局部正面方面，侧重于具体、可取的属性或结果。它通过添加细节和细微差别来补充全局正面提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式设置的文本提示的负面方面，侧重于不良属性或结果。它通过识别最终提示中需要淡化或避免的元素，显著影响样式设置过程。
    - Comfy dtype: STRING
    - Python dtype: str
- clothing_state
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负面样式的范围，无论是全局应用、局部应用还是两者兼而有之，从而指导如何将负面方面整合到样式化提示中。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，指示是否记录原始和样式化的提示以供调试或审查。它有助于理解样式选择对文本的影响。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 全局正面文本提示的样式化版本，根据选定的样式选项进行增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 局部正面文本提示的样式化版本，基于样式选择进行进一步优化。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- text_negative_g
    - 全局负面文本提示的样式化版本，经过修改以反映在更广泛范围内选择的样式调整。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 局部负面文本提示的样式化版本，调整以在更详细的层面上融入所选的样式效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本提示的组合样式化版本，整合了全局和局部的调整。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
