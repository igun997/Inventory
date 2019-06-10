
  <section id="wrapper" class="login-register login-sidebar login-bg">
    <div class="login-bg">
    </div>
    <div class="login-box card">
      <div class="card-body">
        <form class="form-horizontal form-material" method="post" id="login" action="">
          <center>
            <a href="javascript:void(0)" class="text-center db"><img src="<?= base_url("assets/img/logo.png") ?>" style="width:50%;height:50%" alt="Home" /></a>
          </center>
					<div class="form-group" style="padding-top:10px">
					  {msg}
					</div>
          <div class="form-group m-t-40">
            <div class="col-xs-12">
              <input class="form-control" type="text" name="username" required="" placeholder="Username">
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-12">
              <input class="form-control" type="password" name="password" required="" placeholder="Password">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-12">
              <div class="custom-control custom-checkbox">
              </div>
            </div>
          </div>
          <div class="form-group text-center m-t-20">
            <div class="col-xs-12">
              <button class="btn btn-info btn-lg btn-block text-uppercase btn-rounded" type="submit">Masuk</button>
            </div>
          </div>
        </form>

      </div>
    </div>

  </div>
</section>
