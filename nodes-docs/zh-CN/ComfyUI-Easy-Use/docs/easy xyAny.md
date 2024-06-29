# Documentation
- Class name: xyAny
- Category: EasyUse/Logic
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点类便于将输入数据重新组织成与水平或垂直方向对齐的结构化格式。它旨在通过基于指定方向高效地将元素配对排列，从而简化数据操作任务，增强数据在后续处理步骤中的实用性。

# Input types
## Required
- X
    - 参数'X'代表第一组元素，将与'Y'中的元素配对。它的重要性在于建立了数据配对的一方，这对节点的操作和生成的数据结构至关重要。
    - Comfy dtype: COMBO[*]
    - Python dtype: List[Any]
- Y
    - 参数'Y'代表第二组元素，意在与'X'中的元素配对。它在节点的功能中扮演着至关重要的角色，因为它决定了数据配对的另一方，直接影响输出的最终排列。
    - Comfy dtype: COMBO[*]
    - Python dtype: List[Any]
- direction
    - 参数'direction'指定数据配对的方向，可以是'horizontal'或'vertical'。它非常重要，因为它定义了输出的结构，指导节点如何将'X'和'Y'元素排列成期望的格式。
    - Comfy dtype: [str]
    - Python dtype: Union[str, AlwaysEqualProxy]

# Output types
- X
    - 输出'X'是原始'X'输入中元素的重新结构化序列，现在根据指定的方向与'Y'中的元素配对。它代表了节点输出的一半，已经转换以满足水平或垂直排列的要求。
    - Comfy dtype: COMBO[*]
    - Python dtype: List[Any]
- Y
    - 输出'Y'在结构上与输出'X'相似，但由'Y'输入中的元素组成。它构成了节点输出的另一半，完成了基于所选方向组织的搭配数据集。
    - Comfy dtype: COMBO[*]
    - Python dtype: List[Any]

# Usage tips
- Infra type: CPU

# Source code
```
class xyAny:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'X': (AlwaysEqualProxy('*'), {}), 'Y': (AlwaysEqualProxy('*'), {}), 'direction': (['horizontal', 'vertical'], {'default': 'horizontal'})}}
    RETURN_TYPES = (AlwaysEqualProxy('*'), AlwaysEqualProxy('*'))
    RETURN_NAMES = ('X', 'Y')
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True)
    CATEGORY = 'EasyUse/Logic'
    FUNCTION = 'to_xy'

    def to_xy(self, X, Y, direction):
        new_x = list()
        new_y = list()
        if direction[0] == 'horizontal':
            for y in Y:
                for x in X:
                    new_x.append(x)
                    new_y.append(y)
        else:
            for x in X:
                for y in Y:
                    new_x.append(x)
                    new_y.append(y)
        return (new_x, new_y)
```