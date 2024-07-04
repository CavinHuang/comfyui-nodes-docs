
# Documentation
- Class name: XYAny
- Category: List Stuff
- Output node: False

XYAny节点旨在生成X和Y值的组合，并可选择性地加入第三个维度Z来扩展这些组合。它有助于创建和标记这些组合，提供备用标签和指定自定义标签的能力。此节点特别适用于需要探索或可视化不同数据点集之间的关系或交互的数据操作和准备任务。

# Input types
## Required
- X
    - 主要的值集合，用于组合。作为生成值对的一个轴。
    - Comfy dtype: *
    - Python dtype: List[Any]
- Y
    - 次要的值集合，用于与X值组合。作为生成值对的另一个轴。
    - Comfy dtype: *
    - Python dtype: List[Any]
- X_Label_Fallback
    - X值的备用标签，在未提供特定标签时使用。确保每个X值都有相关联的标签。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- Y_Label_Fallback
    - Y值的备用标签，在未提供特定标签时使用。确保每个Y值都有相关联的标签。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- Z_Label_Fallback
    - Z值的备用标签，在未提供特定标签时使用。允许为数据的第三个维度添加标签。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
## Optional
- Z
    - 可选的第三个值集合，用于与X和Y值组合，为组合添加第三个维度。
    - Comfy dtype: *
    - Python dtype: Optional[List[Any]]
- X_Labels
    - X值的自定义标签，如果提供，则覆盖备用标签。
    - Comfy dtype: *
    - Python dtype: Optional[List[Any]]
- Y_Labels
    - Y值的自定义标签，如果提供，则覆盖备用标签。
    - Comfy dtype: *
    - Python dtype: Optional[List[Any]]
- Z_Labels
    - Z值的自定义标签，如果提供，则覆盖备用标签。
    - Comfy dtype: *
    - Python dtype: Optional[List[Any]]

# Output types
- X Values
    - Comfy dtype: *
    - 节点生成的组合结果中的X值。
    - Python dtype: List[Any]
- X Labels
    - Comfy dtype: STRING
    - 与组合的X值相关联的标签。
    - Python dtype: List[str]
- Y Values
    - Comfy dtype: *
    - 节点生成的组合结果中的Y值。
    - Python dtype: List[Any]
- Y Labels
    - Comfy dtype: STRING
    - 与组合的Y值相关联的标签。
    - Python dtype: List[str]
- Z Values
    - Comfy dtype: *
    - 如果提供了Z值，则为节点生成的组合结果中的Z值。
    - Python dtype: List[Any]
- Z Labels
    - Comfy dtype: STRING
    - 如果提供了Z值，则为与组合的Z值相关联的标签。
    - Python dtype: List[str]
- Total Images
    - Comfy dtype: INT
    - 节点生成的组合总数。
    - Python dtype: int
- Split Every
    - Comfy dtype: INT
    - 根据Y值的长度，组合被分割的间隔。
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UnzippedProductAny:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "X": (ANY, {}),
                "Y": (ANY, {}),
                "X_Label_Fallback": (["str()", "Numbers"], {"default": "str()"}),
                "Y_Label_Fallback": (["str()", "Numbers"], {"default": "str()"}),
                "Z_Label_Fallback": (["str()", "Numbers"], {"default": "str()"}),
            },
            "optional": {
                "Z": (ANY, {}),
                "X_Labels": (ANY, {}),
                "Y_Labels": (ANY, {}),
                "Z_Labels": (ANY, {}),
            },
        }

    RETURN_NAMES, RETURN_TYPES = zip(*{
        "X Values": ANY,
        "X Labels": "STRING",
        "Y Values": ANY,
        "Y Labels": "STRING",
        "Z Values": ANY,
        "Z Labels": "STRING",
        "Total Images": "INT",
        "Split Every": "INT",
    }.items())

    OUTPUT_IS_LIST = (True, True, True, True, True, True, False, False)
    INPUT_IS_LIST = True
    FUNCTION = "to_xy"

    CATEGORY = "List Stuff"

    def to_xy(
        self,
        X: List[Any],
        Y: List[Any],
        X_Label_Fallback: List[str],
        Y_Label_Fallback: List[str],
        Z_Label_Fallback: List[str],
        Z: Optional[List[Any]] = None,
        X_Labels: Optional[List[Any]] = None,
        Y_Labels: Optional[List[Any]] = None,
        Z_Labels: Optional[List[Any]] = None,
    ) -> Tuple[List[Any], List[str], List[Any], List[str], List[Any], List[str], int, int]:
        # region Validation
        if len(X_Label_Fallback) != 1:
            raise Exception("X_Label_Fallback must be a single value")
        if len(Y_Label_Fallback) != 1:
            raise Exception("Y_Label_Fallback must be a single value")
        if len(Z_Label_Fallback) != 1:
            raise Exception("Z_Label_Fallback must be a single value")

        if Z_Labels is not None and Z is None:
            raise Exception("Z_Labels must be None if Z is None")

        # region Labels
        get_x_fallback_labels: Callable[[Any], List[str]]
        if X_Label_Fallback[0] == "str()":
            get_x_fallback_labels = lambda x: [str(i) for i in x]
        else:
            get_x_fallback_labels = lambda x: [str(i) for i in range(len(x))]

        get_y_fallback_labels: Callable[[Any], List[str]]
        if Y_Label_Fallback[0] == "str()":
            get_y_fallback_labels = lambda x: [str(i) for i in x]
        else:
            get_y_fallback_labels = lambda x: [str(i) for i in range(len(x))]

        get_z_fallback_labels: Callable[[Any], List[str]]
        if Z_Label_Fallback[0] == "str()":
            get_z_fallback_labels = lambda x: [str(i) for i in x]
        else:
            get_z_fallback_labels = lambda x: [str(i) for i in range(len(x))]

        if X_Labels is None:
            X_Labels = get_x_fallback_labels(X)
        if Y_Labels is None:
            Y_Labels = get_y_fallback_labels(Y)
        if Z_Labels is None and Z is not None:
            Z_Labels = get_z_fallback_labels(Z)
        # endregion

        xy_product = itertools.product(X, Y)
        X_out_tuple, Y_out_tuple = zip(*xy_product)
        X_out: List[str] = list(X_out_tuple)
        Y_out: List[str] = list(Y_out_tuple)

        Z_out = []
        if Z is not None:
            original_len = len(X_out)
            X_out = X_out * len(Z)
            Y_out = Y_out * len(Z)
            for z in Z:
                Z_out.extend([z] * original_len)


        if Z_Labels is None:
            Z_Labels = []

        return X_out, X_Labels, Y_out, Y_Labels, Z_out, Z_Labels, len(X_out), len(Y)

```
