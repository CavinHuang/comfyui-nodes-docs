
# Documentation
- Class name: PerfectionStylerAdvanced
- Category: ali1234/stylers
- Output node: False

PerfectionStylerAdvanced节点基于一组预定义的风格参数动态增强文本提示，不包括"artist"和"milehigh"等特定风格。它允许通过各种风格过滤器（如相机、构图、深度等）来自定义文本提示，旨在改进和完善生成的内容。

# Input types
## Required
- text_positive_g
    - 要进行风格化的全局正面文本提示，作为风格增强的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行风格化的局部正面文本提示，允许对输出的风格方向进行更精细的控制。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行风格化的负面文本提示，用于引导生成远离不需要的主题或风格。
    - Comfy dtype: STRING
    - Python dtype: str
- camera
    - 对文本提示应用相机相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- composition
    - 对文本提示应用构图相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- depth
    - 对文本提示应用深度相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- environment
    - 对文本提示应用环境相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- filter
    - 对文本提示应用滤镜相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- focus
    - 对文本提示应用焦点相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lighting
    - 对文本提示应用光照相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- mood
    - 对文本提示应用情绪相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- subject
    - 对文本提示应用主题相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- theme
    - 对文本提示应用主题相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- timeofday
    - 对文本提示应用一天中的时间相关的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- negative_prompt_to
    - 指定负面风格化的范围，是应用于全局、局部还是两者都适用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: ['Both', 'G only', 'L only']
- log_prompt
    - 一个标志，用于启用输入和风格化提示的日志记录，便于调试和改进风格化过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 经过风格修改的增强全局正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 经过风格修改的增强局部正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 结合了全局和局部修改的增强正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 经过风格修改的增强全局负面文本提示，用于引导生成远离不需要的元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 经过风格修改的增强局部负面文本提示，提供对避免某些元素的更精细控制。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 结合了全局和局部修改的增强负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
