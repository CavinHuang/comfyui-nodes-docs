
# Documentation
- Class name: NounsStylerAdvanced
- Category: ali1234/stylers
- Output node: False

NounsStylerAdvanced 节点通过选择多种样式选项来动态增强文本提示，允许使用高级样式技术来自定义文本属性。它利用全面的数据集对文本输入应用风格修改，旨在根据用户选择的标准来完善和个性化输出。

# Input types
## Required
- text_positive_g
    - 要进行风格化处理的全局正面文本，作为应用全局风格增强的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行风格化处理的局部正面文本，允许对文本样式进行更精细、更局部的调整。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 进行风格修改的负面文本输入，以达到所需的负面语气或强调效果。
    - Comfy dtype: STRING
    - Python dtype: str
- nouns
    - 要在文本中特别风格化或强调的名词列表，允许进行有针对性的风格增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- negative_prompt_to
    - 指定负面样式应用的范围，提供针对全局、局部或两种文本类型的选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- log_prompt
    - 控制提示信息的日志记录，有助于调试和完善样式选择。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 全局风格化的正面文本，反映了广泛的风格增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 局部风格化的正面文本，展示了详细的风格调整。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 综合的正面文本输出，整合了全局和局部的风格增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 全局风格化的负面文本，表明了总体的负面风格变化。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 局部风格化的负面文本，突出了特定的负面风格细节。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 整体风格化的负面文本，融合了全局和局部的负面风格修改。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
