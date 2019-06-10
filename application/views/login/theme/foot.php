{js}
<script src="{url}"></script>
{/js}
<script type="text/javascript">
$(function() {
    $(".preloader").fadeOut();
});
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
});
// ==============================================================
// Login and Recover Password
// ==============================================================
$('#to-recover').on("click", function() {
    $("#loginform").slideUp();
    $("#recoverform").fadeIn();
});
</script>
</body>

</html>
