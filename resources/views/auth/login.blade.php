@extends('layouts.auth')
@section('title')
    Login
@stop
@section('style')
    <link rel="stylesheet" href="{{ asset('/css/login.css') }}">
@stop
@section('content')
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="login-content">

                <div class="login-form">
                    <div class="login-logo">
                        <img id="profile-img" class="profile-img-card" src="/img/profile/max.jpg">
                    </div>
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <div class="form-group row">
                            <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>
                            @if ($errors->has('email'))
                                <span class="invalid-feedback">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                            @endif
                        </div>

                        <div class="form-group row">
                            <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>
                            @if ($errors->has('password'))
                                <span class="invalid-feedback">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox"> Remember Me
                            </label>
                            <label class="pull-right">
                                <a href="{{ route('password.request') }}">Forgotten Password?</a>
                            </label>

                        </div>
                        <button type="submit" class="btn btn-primary btn-block">
                            {{ __('Login') }}
                        </button>
                        <div class="register-link m-t-15 text-center">
                            <p>Don't have account ? <a href="{{ route('register') }}"> {{ __('Register') }}</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@stop

